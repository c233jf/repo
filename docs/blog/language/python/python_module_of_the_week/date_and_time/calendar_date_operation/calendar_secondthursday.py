import calendar
import sys


year = int(sys.argv[1])

# 显示每月
for month in range(1, 13):
    # 计算与月份重叠的每周的日期
    c = calendar.monthcalendar(year, month)
    first_week = c[0]
    second_week = c[1]
    third_week = c[2]

    # 如果第一周有星期四，
    # 第二个星期四是第二周。
    # 否则，第二个星期四必须在
    # 第三周。
    if first_week[calendar.THURSDAY]:
        meeting_date = second_week[calendar.THURSDAY]
    else:
        meeting_date = third_week[calendar.THURSDAY]

    print('{:>3}: {:>2}'.format(calendar.month_abbr[month],
                                meeting_date))
