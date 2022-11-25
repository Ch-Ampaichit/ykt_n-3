import datetime

startingDate = datetime.datetime.now()
curr_m = startingDate.month
y = startingDate.year
periods = [startingDate.strftime('%b-%Y')]

for _ in range(3):
    curr_m = curr_m + 1

    if curr_m == 13:
        curr_m = 1
        y = y+1

    nextMonth = startingDate.replace(month=curr_m, year=y)
    periods.append(nextMonth.strftime('%b-%Y'))

print(f'periods(after): {periods}')
