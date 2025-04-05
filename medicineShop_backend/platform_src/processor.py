import pandas as pd
import os
from static.info import soil_path, soil_processed_path

files_soil = os.listdir(soil_path)

def process_soil_data():
    dfs = []
    for p in files_soil:
        path = soil_path  + p
        tmp_df = pd.read_csv(path)
        if "日期" in tmp_df.columns:
            tmp_df["日期"] = pd.to_datetime(tmp_df["日期"])
        dfs.append(tmp_df)
    df = dfs[0]
    df.to_parquet(soil_processed_path + "soil_plant.parquet", index=False)

def processors():
    process_soil_data()