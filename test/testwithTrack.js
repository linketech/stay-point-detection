const moment = require('moment')
const fsPromises = require('fs').promises
const path = require('path')
const myObj = require('./track.json')

// 枚举常量
const State = {
	Move: 1,
	Stop: 2,
}
const RADIUS = 6371

// D:\nodeworkspace\cultivate\suanfa\test
async function readWithFspromises() {
	const pathFile = path.resolve(__dirname, './track.json')
	console.log(__dirname)
	// const filehandle = await fsPromises.open(pathFile, 'r+')
	// const result = await filehandle.readFile({ encoding: 'utf-8' })
	const result = await fsPromises.readFile(pathFile, { encoding: 'utf-8', flag: 'r' })
	const jsonobj = JSON.parse(result)
	const { track } = jsonobj.data
	// console.log(track)
	return track
}

// 使用[].map() 其中({})的写法，类似return{}这样的写法
// 作用：调用的数组的每一个元素传递给指定的函数，并返回一个新数组
async function translate() {
	const track = await readWithFspromises()
	// readByRequire
	// const { track } = myObj.data
	const array = track.map((obj) => ({
		lat: obj.latitude / 3600000,
		lng: obj.longitude / 3600000,
		time: obj.timestamp,
	}))
	return array
}

// https://github.com/Maciek416/gps-distance/blob/master/lib/distance.js#L13
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

// https://www.jianshu.com/p/d2596a294482 使用momentjs计算时间差
// moment(Number)要求输入ms 得到的单位自动转化为'second'秒
function getDuration(time1, time2) {
	return moment(time2 * 1000).diff(moment(time1 * 1000), 'second')
	// return time2 - time1
}


// 设置值单位 setdis:米 settime:秒
async function movementStateCalculator({ firstState, distanceThreshold, timeThreshold }) {
	const output = []
	const arr = await translate()
	if (arr.length < 2) {
		throw new Error('the number of array elements must be greater than 2')
	}
	let pivot = arr[0]
	pivot.state = firstState
	// const stop = pivot.state // 2是stop 1是move

	for (let i = 0; i < arr.length; i++) {
		const current = arr[i]
		if (current != null) {
			const distance = getDistance(pivot.lat, pivot.lng, current.lat, current.lng)
			const duration = getDuration(pivot.time, current.time)
			console.log(`distance ${i} is ${distance}`)
			console.log(`duration ${i} is ${duration}`)
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
				lat: current.lat, lng: current.lng, timestamp: current.time, state: current.state,
			}
			output.push(newTrack)
		}
	}
	// console.log(output) 无法查看完整数据，通过写进文件来读取完整信息
	const toFile = path.resolve(__dirname, './result.json')
	await fsPromises.writeFile(toFile, JSON.stringify(output), { flag: 'w' })
	return output
}

movementStateCalculator({ firstState: State.Stop, distanceThreshold: 50, timeThreshold: 180 })
