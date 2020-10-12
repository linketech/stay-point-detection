#  @linke/stay-point-detection

#### 1.简介

​       **车辆状态计算：**

​        输入为带有经纬度以及时间的对象数组，如[{ latitude, longitude, timestamp},{...},...]；

​        输出为带有经纬度、时间以及车辆状态的对象数组，如[{ latitude, longitude, timestamp, state},{...},...]；

​        根据输入的信息进行距离差和时间差计算，并与自定义的 distanceThreshold、timeThreshold 进行比较，实现对判断车辆移动停留算法的优化。

​        **状态持续时间计算：**

​        输入为带有时间、状态和其他属性(可选)的对象数组，如[{timestamp, state, ...},{...},...]；

​        当有轨迹点发生状态改变时，则输出为带有时间、状态、开始时间、结束时间、持续时间和其他属性(可选)的对象数组，如[{ timestamp, state, start_time, end_time, state_duration, ...},{...},...]；

#### 2.如何使用

在你的项目根目录，执行以下命令：

```
npm install --save @linke/stay-point-detection
```



#### 3.使用说明

##### 代码涉及的属性以及单位说明

**车辆状态计算：**

|      字段名       |      含义      |                        数据类型&说明                         | 单位 |
| :---------------: | :------------: | :----------------------------------------------------------: | :--: |
|     latitude      | 输入对象的纬度 |                            Number                            |  度  |
|     longitude     | 输入对象的经度 |                            Number                            |  度  |
|     timestamp     | 输入对象的时间 | Number/String; 使用moment.js计算时间差,支持字符串、Date、时间戳以及数组等格式--[moment()解析](http://momentjs.cn/docs/#/parsing/) |  ms  |
|    firstState     |  车辆初始状态  |      Enum(State:{ Move:1, Stop:2 })；默认值为State.Stop      |      |
| distanceThreshold |   自定义距离   |                      Number；默认值为50                      |  m   |
|   timeThreshold   |  自定义时间差  |                     Number；默认值为180                      |  s   |

**状态持续时间计算：**

|  字段名   |       含义       |         数据类型&说明          | 单位 |
| :-------: | :--------------: | :----------------------------: | :--: |
| timestamp | 输入轨迹点的时间 |         Number/String          |  ms  |
|   state   |    轨迹点状态    | Enum(State:{ Move:1, Stop:2 }) |      |