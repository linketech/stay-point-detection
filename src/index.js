/* eslint-disable max-len */
const moment = require('moment')
const _ = require('lodash')

// 枚举常量
const State = {
	Move: 1,
	Stop: 2,
}
const RADIUS = 6371

// gps计算距离
// R和Distance单位是相同，如果是采用6371.004千米作为半径，那么Distance就是千米为单位
function Rad(d) {
	return (d * Math.PI) / 180.0
}
// 精度较高 计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
function getDistance(fromLat, fromLng, toLat, toLng) {
	const radFromLat = Rad(fromLat)
	const radToLat = Rad(toLat)
	const dLat = radToLat - radFromLat
	const dLng = Rad(toLng) - Rad(fromLng)

	const a = Math.pow(Math.sin(dLat / 2), 2)
          + (Math.pow(Math.sin(dLng / 2), 2) * Math.cos(fromLat) * Math.cos(toLat))
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

	return RADIUS * c * 1000 // 转化为m为单位
}

// 使用momentjs计算时间差
// moment(Number)要求输入ms 得到的单位自动转化为'second'秒
function getDuration(time1, time2) {
	return moment(time2).diff(moment(time1), 'second')
}

// 设置值单位 distanceThreshold:米 timeThreshold:秒
async function movementStateCalculator(arrdata, { firstState = State.Stop, distanceThreshold = 50, timeThreshold = 180 } = {}) {
	if (!Array.isArray(arrdata)) {
		throw new Error('arrdata must be an array type')
	} 

	// 浅拷贝
	const output = []
	let pivot = { ...arrdata[0] }
	pivot.state = firstState
	for (let i = 0; i < arrdata.length; i += 1) {
		const current = { ...arrdata[i] }
		const distance = getDistance(pivot.latitude, pivot.longitude, current.latitude, current.longitude)
		const duration = getDuration(pivot.timestamp, current.timestamp)
		if (pivot.state === State.Stop) {
			if (distance < distanceThreshold) {
				current.state = State.Stop
			} else {
				current.state = State.Move
				pivot = current
			}
		} else if (pivot.state === State.Move) {
			if (distance > distanceThreshold) {
				current.state = State.Move
				pivot = current
			} else if (duration > timeThreshold) {
				current.state = State.Stop
				pivot = current
			} else {
				current.state = State.Move
			}
		}
		output.push(current)
	}
	return output
}

function stateDurationCalculator(timedata){
	const new_data = _.cloneDeep(timedata)
	let start = 0

	for (let index = 0; index < new_data.length; index += 1) {
		new_data[start].start_time = new_data[start].timestamp
		new_data[start].end_time = new_data[index].timestamp
		new_data[start].state_duration = new_data[index].timestamp - new_data[start].timestamp
		if (new_data[start].state !== new_data[index].state) {
			start = index
		}
	}
	return new_data
}
module.exports = { movementStateCalculator, State, stateDurationCalculator}
