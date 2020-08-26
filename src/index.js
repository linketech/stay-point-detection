/* eslint-disable max-len */
/* eslint-disable no-mixed-spaces-and-tabs */
const moment = require('moment')

// 枚举常量
const State = {
	Move: 1,
	Stop: 2,
}
const RADIUS = 6371

// gps计算距离
// R和Distance单位是相同，如果是采用6371.004千米作为半径，那么Distance就是千米为单位
function Rad(d) {
	return d * Math.PI / 180.0
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
	const output = []
	if (Array.isArray(arrdata) && arrdata.length > 2) {
		next()
	} else if (arrdata.length < 2) {
		throw new Error('the number of array elements must be greater than 2')
	}
	let pivot = arrdata[0]
	pivot.state = firstState

	for (let i = 0; i < arrdata.length; i += 1) {
		const current = arrdata[i]
		const distance = getDistance(pivot.lat, pivot.lng, current.lat, current.lng)
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
		const newTrack = {
			lat: current.lat, lng: current.lng, timestamp: current.timestamp, state: current.state,
		}
		output.push(newTrack)
	}
	return output
}


module.exports = { movementStateCalculator, State }
