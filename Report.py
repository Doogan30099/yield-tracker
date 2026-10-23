import csv 
with open('harvests.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    strain_plants = {}
    for row in reader:
        if row['plants'] is None or row['plants'] == '':
            print(f"The row has not been updated yet for strain {row['strain']}")
            continue
        strain_plants[row['strain']] = strain_plants.get(row['strain'], 0) + int(row['plants'])
    print("Total Plants:", sum(strain_plants.values()))
    for strain, plants in strain_plants.items():
            print(f"Strain: {strain}, Plants: {plants}")