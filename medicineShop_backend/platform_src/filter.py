import pandas as pd
from static.info import soil_processed_path

def filter_soil_data():
    df = pd.read_parquet(soil_processed_path+"soil_plant.parquet")

    if "日期" in df.columns:
        df["日期"] = df["日期"].dt.strftime("%Y-%m-%d")

    df = df.head(8)
    return df

def filters():
    filter_soil_data()