# Date

Date 类型将日期 保存为自协调世界时(UTC，Universal Time Coordinated)时间 1970 年 1 月 1 日午夜(零时)至今所 经过的毫秒数。使用这种存储格式，Date 类型可以精确表示 1970 年 1 月 1 日之前及之后 285 616 年的 日期。

```js
console.log(new Date().toLocaleString()) //5/2/2022, 8:42:38 PM
console.log(new Date().toString()) // Mon May 02 2022 20:42:38 GMT+0800 (China Standard Time)
console.log(new Date().toDateString()) //星期一 五月 2号 2022
```

toDateString()显示日期中的周几、月、日、年(格式特定于实现);
toTimeString()显示日期中的时、分、秒和时区(格式特定于实现);
toLocaleDateString()显示日期中的周几、月、日、年(格式特定于实现和地区);
toLocaleTimeString()显示日期中的时、分、秒(格式特定于实现和地区);
toUTCString()显示完整的 UTC 日期(格式特定于实现)。
这些方法的输出与 toLocaleString()和 toString()一样，会因浏览器而异。因此不能用于在用户界面上一致地显示日期。

getTime() 返回日期的毫秒表示；与 valueof()相同

setTime (milliseconds) 设置日期的毫秒表示，从而修改整个日期

getFullYear (） 返回 4 位数年（即 2019 而不是 19）

getUTCFullYear (） 返回 UTC 日期的 4 位数年

setFullYear (year) 设置日期的年（year 必须是 4 位数）

setUTCFullYear (year) 设置 UTC 日期的年（year 必须是 4 位数）

getMonth(） 返回日期的月（0 表示 1 月，11 表示 12 月）

getUTCMonth(） 返回 UTC 日期的月（0 表示 1 月，11 表示 12 月）

setMonth (month) 设置日期的月（month 为大于 0 的数值，大于 11 加年）

setUTCMonth (month) 设置 UTC 日期的月（month 为大于 0 的数值，大于 11 加年）

getDate() 返回日期中的日（1~31）

getUrCDate() 返回 UTC 日期中的日（1~31）

setDate (date) 设置日期中的日（如果 date 大于该月天数，则加月）

setUTCDate (date) 设置 UTC 日期中的日（如果 date 大于该月天数，则加月）

getDay(） 返回日期中表示周几的数值（0 表示周日，6 表示周六）

getUrCDay() 返回 UTC 日期中表示周几的数值（0 表示周日，6 表示周六）

getHours() 返回日期中的时（0~23）

getUTCHours(） 返回 UTC 日期中的时（0~23）

setHours (hours) 设置日期中的时（如果 hours 大于 23，则加日）

setUrCHours (hours) 设置 UTC 日期中的时（如果 hours 大于 23，则加日）

getMinutes () 返回日期中的分(0~59）

getUTCMinutes(） 返回 UTC 日期中的分(0~59）

setMinutes (minutes) 设置日期中的分（如果 minutes 大于 59，则加时）

setUTCMinutes (minutes) 设置 UTC 日期中的分（如果 minutes 大于 59，则加时）

get Seconds(） 返回日期中的秒( 0~59）

getUTCSeconds() 返回 UTC 日期中的秒(0~59）

set Seconds (seconds) 设置日期中的秒（如果 seconds 大于 59，则加分）

setUTCSeconds (seconds) 设置 UTC 日期中的秒（如果 seconds 大于 59，则加分）

getMilliseconds(） 返回日期中的毫秒

getUTCMilliseconds (） 返回 UTC 日期中的毫秒

setMilliseconds (milliseconds) 设置日期中的毫秒

setUTCMilliseconds (milliseconds) 设置 UTC 日期中的毫秒

getTimezoneoffset () 返回以分钟计的 UTC 与本地时区的偏移量（如美国 EST 即“东部标准时间”

返回 300，进人夏令时的地区可能有所差异）
