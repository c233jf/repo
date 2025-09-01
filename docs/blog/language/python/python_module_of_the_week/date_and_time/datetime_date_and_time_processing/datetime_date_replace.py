import datetime


d1 = datetime.date(2000, 2, 28)
print('d1:', d1.ctime())

d2 = d1.replace(year=2009)
print('d2:', d2.ctime())
