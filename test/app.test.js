/* eslint-disable max-len */
/* eslint-disable no-undef */
const should = require('should')
const { movementStateCalculator, State } = require('./appForTest.js')

const arrdata = {
	status: 0,
	_rid: '25460df5996a',
	message: '操作成功',
	data: {
		track: [
			{
				mileage: 942.0413855529911, degree: 0.0, timestamp: 1597798751, locate_error: 18, clongitude: 408368912, address: '', clatitude: 109268473, point_type: 2, speed: 1, firmware_version: 'E', lid: 0, latitude: 109255356, dev_type: 'ZJ210', longitude: 408323664, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
			}, {
				mileage: 956.6836748289842, degree: 150.0, timestamp: 1597799132, locate_error: 18, clongitude: 408368803, address: '', clatitude: 109268007, point_type: 2, speed: 8, firmware_version: 'E', lid: 0, latitude: 109254888, dev_type: 'ZJ210', longitude: 408323556, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
			}, {
				mileage: 975.167424914466, degree: 0.0, timestamp: 1597799159, locate_error: 19, clongitude: 408369417, address: '', clatitude: 109268284, point_type: 2, speed: 1, firmware_version: 'E', lid: 0, latitude: 109255176, dev_type: 'ZJ210', longitude: 408324168, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
			}, {
				mileage: 987.4641964164028, degree: 0.0, timestamp: 1597799317, locate_error: 18, clongitude: 408369743, address: '', clatitude: 109268566, point_type: 2, speed: 4, firmware_version: 'E', lid: 0, latitude: 109255464, dev_type: 'ZJ210', longitude: 408324492, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
			}, {
				mileage: 1039.3956019183006, degree: 208.0, timestamp: 1597799342, locate_error: 10, clongitude: 408370645, address: '', clatitude: 109267072, point_type: 1, speed: 17, firmware_version: 'E', lid: 0, latitude: 109253988, dev_type: 'ZJ210', longitude: 408325392, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
			},
		],
	},
}
const arrdata1 = {
	status: 0,
	_rid: '25460df5996a',
	message: '操作成功',
	data: {
		track: [
			{
				mileage: 34315.07243095323, degree: 114.0, timestamp: 1597826397, locate_error: 8, clongitude: 408716021, address: '', clatitude: 109352171, point_type: 1, speed: 29, firmware_version: 'E', lid: 0, latitude: 109338732, dev_type: 'ZJ210', longitude: 408672036, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
			}, {
				mileage: 34343.752732276036, degree: 0.0, timestamp: 1597826557, locate_error: 10, clongitude: 408716955, address: '', clatitude: 109352631, point_type: 1, speed: 0, firmware_version: 'E', lid: 0, latitude: 109339200, dev_type: 'ZJ210', longitude: 408672972, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
			}, {
				mileage: 34345.67514702327, degree: 0.0, timestamp: 1597826618, locate_error: 7, clongitude: 408717027, address: '', clatitude: 109352631, point_type: 1, speed: 0, firmware_version: 'E', lid: 0, latitude: 109339200, dev_type: 'ZJ210', longitude: 408673044, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
			}, {
				mileage: 34347.597561770504, degree: 0.0, timestamp: 1597826679, locate_error: 6, clongitude: 408716955, address: '', clatitude: 109352631, point_type: 1, speed: 0, firmware_version: 'E', lid: 0, latitude: 109339200, dev_type: 'ZJ210', longitude: 408672972, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
			},
		],
	},
}

const arrdata2 = {
	status: 0,
	_rid: '25460df5996a',
	message: '操作成功',
	data: {
		track: [
			{
				mileage: 34348.73259209824, degree: 94.0, timestamp: 1597836355, locate_error: 8, clongitude: 408699513, address: '', clatitude: 109359295, point_type: 1, speed: 24, firmware_version: 'E', lid: 0, latitude: 109345752, dev_type: 'ZJ210', longitude: 408655476, tid: 'efd12ad096104b8a9d2668d2ec088588', locate_type: 1,
			}],
	},
}


describe('判断车状态', () => {
	describe('判断输出数组元素个数是否与输入的一样', () => {
		it('return output.length与track.length相等', async () => {
			const output = await movementStateCalculator({
				firstState: State.Stop, arrdata, distanceThreshold: 15, timeThreshold: 60,
			})
			const { length } = arrdata.data.track
			output.length.should.equal(length)
		})
	})

	describe('p0停止，p1、p2、p3距离p0都小于15m', () => {
		it('return p1、p2、p3的状态都静止', async () => {
			// distance 0 is 14.54467545779407
			// duration 0 is 381
			// distance 1 is 12.740283431681389
			// duration 1 is 27
			// distance 2 is 10.121891983384945
			// duration 2 is 158
			const output = await movementStateCalculator({
				firstState: State.Stop, arrdata, distanceThreshold: 15, timeThreshold: 60,
			})
			output[0].state.should.equal(State.Stop)
			output[1].state.should.equal(State.Stop)
			output[2].state.should.equal(State.Stop)
			output[3].state.should.equal(State.Stop)
		})
	})


	describe('p0停止，p1、p2、p3距离p0小于40m、p4距离p0大于40m', () => {
		it('return p1、p2、p3静止、p4移动', async () => {
			// distance 0 is 14.54467545779407
			// duration 0 is 381
			// distance 1 is 12.740283431681389
			// duration 1 is 27
			// distance 2 is 10.121891983384945
			// duration 2 is 158
			// distance 3 is 47.521361235966324
			// duration 3 is 25
			const output = await movementStateCalculator({
				firstState: State.Stop, arrdata, distanceThreshold: 40, timeThreshold: 180,
			})
			output[0].state.should.equal(State.Stop)
			output[1].state.should.equal(State.Stop)
			output[2].state.should.equal(State.Stop)
			output[3].state.should.equal(State.Stop)
			output[4].state.should.equal(State.Move)
		})
	})

	describe('p0停止，p1距离p0大于12m;p1移动p2距离p1大于12m', () => {
		it('return p1移动、p2移动', async () => {
			const output = await movementStateCalculator({
				firstState: State.Stop, arrdata, distanceThreshold: 12, timeThreshold: 180,
			})
			output[0].state.should.equal(State.Stop)
			output[1].state.should.equal(State.Move)
			output[2].state.should.equal(State.Move)
		})
	})

	describe('p0移动，p1距离p0大于10m;p1移动,p2距离p1小于10m,时间差相差大于50s,p2静止', () => {
		it('return p1移动、p2静止', async () => {
			// distance 0 is 20.499723879344455
			// duration 0 is 160
			// distance 1 is 1.1182431271974693
			// duration 1 is 61
			// distance 2 is 1.1182431271974693
			// duration 2 is 61
			const output = await movementStateCalculator({
				firstState: State.Move, arrdata: arrdata1, distanceThreshold: 10, timeThreshold: 50,
			})
			output[0].state.should.equal(State.Move)
			output[1].state.should.equal(State.Move)
			output[2].state.should.equal(State.Stop)
		})
	})

	describe('p0移动，p1距离p0大于10m;p1移动,p2距离p1小于10m,时间差相差小于65s,p2移动', () => {
		it('return p1移动、p2移动', async () => {
			// distance 0 is 20.499723879344455
			// duration 0 is 160
			// distance 1 is 1.1182431271974693
			// duration 1 is 61
			// distance 2 is 1.1182431271974693
			// duration 2 is 61
			const output = await movementStateCalculator({
				firstState: State.Move, arrdata: arrdata1, distanceThreshold: 10, timeThreshold: 65,
			})
			output[0].state.should.equal(State.Move)
			output[1].state.should.equal(State.Move)
			output[2].state.should.equal(State.Move)
		})
	})

	describe('数组元素必须大于2，否则没意义', () => {
		it('return 数组元素必须大于2', async () => {
			await movementStateCalculator({
				firstState: State.Stop, arrdata: arrdata2, distanceThreshold: 1.5, timeThreshold: 8,
			}).catch((err) => {
				err.message.should.equal('the number of array elements must be greater than 2')
			})
		})
	})
})
