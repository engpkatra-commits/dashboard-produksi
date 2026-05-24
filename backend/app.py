import streamlit as st
import pandas as pd

# 1. Setup Layar Utama
st.set_page_config(layout="wide")
st.title("🚜 PRODUCTION DASHBOARD - SITE TRA")
st.markdown("---")

# 2. Form Input Fleet & Ritase
st.subheader("Form Input Lapangan")
fleet = st.selectbox(
    "Pilih Fleet:", 
    ["CAT 773", "CWE280R"]
)
rit = st.number_input(
    "Jumlah Rit:", 
    min_value=1, 
    value=1
)
if st.button("Kirim Data"):
    st.success(f"{fleet} masuk {rit} Rit")

st.markdown("---")

# 3. Ringkasan Metrik Produksi (KPI)
st.subheader("Key Performance Indicator")
kpi1, kpi2 = st.columns(2)
kpi1.metric(
    label="OB REMOVAL", 
    value="14.2 M BCM"
)
kpi2.metric(
    label="COAL GETTING", 
    value="3.85 M MT"
)

st.markdown("---")

# 4. Tabel Status Alat
st.subheader("📋 Equipment Status")
data_unit = {
    "Unit ID": ["EX-101", "DT-205"],
    "Status": ["Operating", "Breakdown"],
    "Fuel": ["91%", "62%"]
}
df = pd.DataFrame(data_unit)
st.table(df)