import csv 
with open('harvests.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    total_grade_a = 0
    for row in reader:
        total_grade_a += int(row['grade_a_grams']) if row['grade_a_grams'] else 0
        print(row['strain']), print(row['grade_a_grams']) 
    print("Total Grade A:", total_grade_a)