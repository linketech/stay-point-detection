# stop-or-move

#### 1.简介

​        输入为带有经纬度以及时间的对象数组，如[{ lat, lng, timestamp},{...},...]；

​        输出为带有经纬度以及车辆状态的对象数组，如[{ lat, lng, state},{...},...]；

​        根据输入的信息进行距离差和时间差计算，并与自定义的 distanceThreshold、timeThreshold 进行比较，实现对判断车辆移动停留算法的优化。



#### 2.使用说明

##### 代码涉及的属性以及单位说明

|      字段名       |      含义      |                        数据类型&说明                         | 单位 |
| :---------------: | :------------: | :----------------------------------------------------------: | :--: |
|    firstState     |  车辆初始状态  |                Enum(State:{ Move:1, Stop:2 })                |      |
|        lat        | 输入对象的纬度 |                            Number                            |  度  |
|        lng        | 输入对象的经度 |                            Number                            |  度  |
|     timestamp     | 输入对象的时间 | Number/String; 使用moment.js计算时间差,支持字符串、Date、时间戳以及数组等格式--[moment()解析](http://momentjs.cn/docs/#/parsing/) |  ms  |
| distanceThreshold |   自定义距离   |                            Number                            |  m   |
|   timeThreshold   |  自定义时间差  |                            Number                            |  s   |