/* eslint-disable max-len */
/* eslint-disable no-undef */
const should = require('should')
const { movementStateCalculator, State, stayDurationCalculator} = require('../src/index.js')

const arrdata = [
	{
		mileage: 942.0413855529911, degree: 0.0, timestamp: 1597798751 * 1000, locate_error: 18, clongitude: 408368912, address: '', clatitude: 109268473, point_type: 2, speed: 1, firmware_version: 'E', lid: 0, latitude: 109255356 / 3600000, dev_type: 'ZJ210', longitude: 408323664 / 3600000, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
	}, {
		mileage: 956.6836748289842, degree: 150.0, timestamp: 1597799132 * 1000, locate_error: 18, clongitude: 408368803, address: '', clatitude: 109268007, point_type: 2, speed: 8, firmware_version: 'E', lid: 0, latitude: 109254888 / 3600000, dev_type: 'ZJ210', longitude: 408323556 / 3600000, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
	}, {
		mileage: 975.167424914466, degree: 0.0, timestamp: 1597799159 * 1000, locate_error: 19, clongitude: 408369417, address: '', clatitude: 109268284, point_type: 2, speed: 1, firmware_version: 'E', lid: 0, latitude: 109255176 / 3600000, dev_type: 'ZJ210', longitude: 408324168 / 3600000, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
	}, {
		mileage: 987.4641964164028, degree: 0.0, timestamp: 1597799317 * 1000, locate_error: 18, clongitude: 408369743, address: '', clatitude: 109268566, point_type: 2, speed: 4, firmware_version: 'E', lid: 0, latitude: 109255464 / 3600000, dev_type: 'ZJ210', longitude: 408324492 / 3600000, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
	}, {
		mileage: 1039.3956019183006, degree: 208.0, timestamp: 1597799342 * 1000, locate_error: 10, clongitude: 408370645, address: '', clatitude: 109267072, point_type: 1, speed: 17, firmware_version: 'E', lid: 0, latitude: 109253988 / 3600000, dev_type: 'ZJ210', longitude: 408325392 / 3600000, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
	},
]

const arrdata1 = [
	{
		mileage: 34315.07243095323, degree: 114.0, timestamp: 1597826397 * 1000, locate_error: 8, clongitude: 408716021, address: '', clatitude: 109352171, point_type: 1, speed: 29, firmware_version: 'E', lid: 0, latitude: 109338732 / 3600000, dev_type: 'ZJ210', longitude: 408672036 / 3600000, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
	}, {
		mileage: 34343.752732276036, degree: 0.0, timestamp: 1597826557 * 1000, locate_error: 10, clongitude: 408716955, address: '', clatitude: 109352631, point_type: 1, speed: 0, firmware_version: 'E', lid: 0, latitude: 109339200 / 3600000, dev_type: 'ZJ210', longitude: 408672972 / 3600000, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
	}, {
		mileage: 34345.67514702327, degree: 0.0, timestamp: 1597826618 * 1000, locate_error: 7, clongitude: 408717027, address: '', clatitude: 109352631, point_type: 1, speed: 0, firmware_version: 'E', lid: 0, latitude: 109339200 / 3600000, dev_type: 'ZJ210', longitude: 408673044 / 3600000, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
	}, {
		mileage: 34347.597561770504, degree: 0.0, timestamp: 1597826679 * 1000, locate_error: 6, clongitude: 408716955, address: '', clatitude: 109352631, point_type: 1, speed: 0, firmware_version: 'E', lid: 0, latitude: 109339200 / 3600000, dev_type: 'ZJ210', longitude: 408672972 / 3600000, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
	},
]

const arrdata2 = [
	{
		mileage: 34315.07243095323, degree: 114.0, timestamp: '2020-01-01 10:00:00', locate_error: 8, clongitude: 408716021, address: '', clatitude: 109352171, point_type: 1, speed: 29, firmware_version: 'E', lid: 0, latitude: 109338732 / 3600000, dev_type: 'ZJ210', longitude: 408672036 / 3600000, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
	}, {
		mileage: 34343.752732276036, degree: 0.0, timestamp: '2020-01-01 10:00:10', locate_error: 10, clongitude: 408716955, address: '', clatitude: 109352631, point_type: 1, speed: 0, firmware_version: 'E', lid: 0, latitude: 109339200 / 3600000, dev_type: 'ZJ210', longitude: 408672972 / 3600000, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
	}, {
		mileage: 34345.67514702327, degree: 0.0, timestamp: '2020-01-01 10:00:20', locate_error: 7, clongitude: 408717027, address: '', clatitude: 109352631, point_type: 1, speed: 0, firmware_version: 'E', lid: 0, latitude: 109339200 / 3600000, dev_type: 'ZJ210', longitude: 408673044 / 3600000, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
	}, {
		mileage: 34347.597561770504, degree: 0.0, timestamp: '2020-01-01 10:00:30', locate_error: 6, clongitude: 408716955, address: '', clatitude: 109352631, point_type: 1, speed: 0, firmware_version: 'E', lid: 0, latitude: 109339200 / 3600000, dev_type: 'ZJ210', longitude: 408672972 / 3600000, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
	},
]

const arrdata3 = [
	{
		mileage: 34348.73259209824, degree: 94.0, timestamp: 1597836355 * 1000, locate_error: 8, clongitude: 408699513, address: '', clatitude: 109359295, point_type: 1, speed: 24, firmware_version: 'E', lid: 0, latitude: 109345752 / 3600000, dev_type: 'ZJ210', longitude: 408655476 / 3600000, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
	},
]

const data4 = { 1: 1, 2: 2, 3: 3 }

describe('判断车状态', () => {
	describe('判断输出数组元素个数是否与输入的一样', () => {
		it('return output.length与track.length相等', async () => {
			const output = await movementStateCalculator(arrdata, { distanceThreshold: 15, timeThreshold: 60 })
			const { length } = arrdata
			output.length.should.equal(length)
		})
	})

	describe('p0停止，p1、p2、p3距离p0都小于15m', () => {
		it('return p1、p2、p3的状态都静止', async () => {
			// distance 0 is 0
			// duration 0 is 0
			// distance 1 is 14.54467545779407
			// duration 1 is 381
			// distance 2 is 9.345534559230751
			// duration 2 is 408
			// distance 3 is 12.784704002146666
			// duration 3 is 566
			const output = await movementStateCalculator(arrdata, { distanceThreshold: 15, timeThreshold: 60 })
			output[0].state.should.equal(State.Stop)
			output[1].state.should.equal(State.Stop)
			output[2].state.should.equal(State.Stop)
			output[3].state.should.equal(State.Stop)
		})
	})


	describe('p0停止，p1、p2、p3距离p0小于40m、p4距离p0大于40m', () => {
		it('return p1、p2、p3静止、p4移动', async () => {
			// distance 0 is 0
			// duration 0 is 0
			// distance 1 is 14.54467545779407
			// duration 1 is 381
			// distance 2 is 9.345534559230751
			// duration 2 is 408
			// distance 3 is 12.784704002146666
			// duration 3 is 566
			// distance 4 is 49.48059127043504
			// duration 4 is 591
			const output = await movementStateCalculator(arrdata, { firstState: State.Stop, distanceThreshold: 40, timeThreshold: 180 })
			output[0].state.should.equal(State.Stop)
			output[1].state.should.equal(State.Stop)
			output[2].state.should.equal(State.Stop)
			output[3].state.should.equal(State.Stop)
			output[4].state.should.equal(State.Move)
		})
	})

	describe('p0停止，p1距离p0大于12m;p1移动p2距离p1大于12m', () => {
		it('return p1移动、p2移动', async () => {
			// distance 0 is 0
			// duration 0 is 0
			// distance 1 is 14.54467545779407
			// duration 1 is 381
			// distance 2 is 12.740283431681389
			// duration 2 is 27
			// distance 3 is 10.121891983384945
			// duration 3 is 158
			// distance 4 is 40.976278718077836
			// duration 4 is 183
			const output = await movementStateCalculator(arrdata, { firstState: State.Stop, distanceThreshold: 12, timeThreshold: 180 })
			output[0].state.should.equal(State.Stop)
			output[1].state.should.equal(State.Move)
			output[2].state.should.equal(State.Move)
		})
	})

	describe('p0移动，p1距离p0大于10m;p1移动,p2距离p1小于10m,时间差相差大于50s,p2静止', () => {
		it('return p1移动、p2静止', async () => {
			// distance 0 is 0
			// duration 0 is 0
			// distance 1 is 20.499723879344455
			// duration 1 is 160
			// distance 2 is 1.1182431271974693
			// duration 2 is 61
			// distance 3 is 1.1182431271974693
			// duration 3 is 61
			const output = await movementStateCalculator(arrdata1, { firstState: State.Move, distanceThreshold: 10, timeThreshold: 50 })
			output[0].state.should.equal(State.Move)
			output[1].state.should.equal(State.Move)
			output[2].state.should.equal(State.Stop)
		})
	})

	describe('p0移动，p1距离p0大于10m;p1移动,p2距离p1小于10m,时间差相差小于65s,p2移动', () => {
		it('return p1移动、p2移动', async () => {
			// distance 0 is 0
			// duration 0 is 0
			// distance 1 is 20.499723879344455
			// duration 1 is 160
			// distance 2 is 1.1182431271974693
			// duration 2 is 61
			const output = await movementStateCalculator(arrdata1, { firstState: State.Move, distanceThreshold: 10, timeThreshold: 65 })
			output[0].state.should.equal(State.Move)
			output[1].state.should.equal(State.Move)
			output[2].state.should.equal(State.Move)
		})
	})

	describe('moment()是否识别日期字符串', () => {
		it('moment()可识别如"2020-01-01 10:00:00"的日期字符串', async () => {
			// distance 0 is 0
			// duration 0 is 0
			// distance 1 is 20.499723879344455
			// duration 1 is 10
			// distance 2 is 1.1182431271974693
			// duration 2 is 10
			// distance 3 is 0
			// duration 3 is 20
			const output = await movementStateCalculator(arrdata2, { firstState: State.Move, distanceThreshold: 10, timeThreshold: 65 })
			output[0].state.should.equal(State.Move)
			output[1].state.should.equal(State.Move)
			output[2].state.should.equal(State.Move)
		})
	})

	describe('数组元素只有一个时，返回默认状态', () => {
		it('返回该点状态与默认状态一致', async () => {
			const output = await movementStateCalculator(arrdata3, { firstState: State.Move, distanceThreshold: 10, timeThreshold: 65 })
			output[0].state.should.equal(State.Move)
		})
	})

	describe('数组个数为0，返回空数组', () => {
		it('输出数组为空数组', async () => {
			const output = await movementStateCalculator([], { firstState: State.Stop, distanceThreshold: 10, timeThreshold: 65 })
			output.length.should.equal(0)
		})
	})

	describe('第一个参数必须是数组类型', () => {
		it('arrdata must be an array type', async () => {
			await movementStateCalculator(data4).should.be.rejectedWith('arrdata must be an array type')
		})
	})
})

const timedata =  [
	{
		timestamp: 1597826397 * 1000, state: 2
	}, {
		timestamp: 1597826557 * 1000, state: 2
	}, {
		timestamp: 1597826618 * 1000, state: 1
	}, {
		timestamp: 1597826679 * 1000, state: 1
	}, {
		timestamp: 1597826730 * 1000, state: 2
	},
]

describe('移动停留状态维持时间计算', () => {
	describe('p3状态由静止变为移动，p5状态由移动变为静止', () => {
		it('p3前静止的维持时间为p3时间-p1时间，p5前移动的维持时间为p5时间-p3时间', () => {
			const output = stayDurationCalculator(timedata)
			output[0].stay_time.should.equal(output[2].timestamp-output[0].timestamp)
			output[2].stay_time.should.equal(output[4].timestamp-output[2].timestamp)
		})
	})
})
