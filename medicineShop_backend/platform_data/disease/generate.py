import csv
import random
from datetime import datetime, timedelta

areas = ["一区", "二区", "三区", "四区", "五区"]
days = 365 * 3
today = datetime.today()

rows = []
for i in range(days):
    date = (today - timedelta(days=days - 1 - i)).strftime("%Y/%m/%d")
    values = [f"{random.uniform(0, 100):.8f}" for _ in areas]
    rows.append([date] + values)

with open("pest.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["日期"] + areas)
    writer.writerows(rows)

rows = []
for i in range(365, days):
    date = (today - timedelta(days=days - 1 - i)).strftime("%Y/%m/%d")
    values = [f"{random.uniform(0, 100):.8f}" for _ in areas]
    rows.append([date] + values)

with open("weed.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["日期"] + areas)
    writer.writerows(rows)
