import pandas as pd

# dataset load
df = pd.read_csv("emails.csv")

# first 5 rows print
print(df.head())

# check dataset info
print(df.info())

# check missing values
print(df.isnull().sum())

# check columns
print(df.columns)

# drop unnecessary column
df = df.drop(columns=["Email No."])

print(df.head())