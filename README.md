
# 📊 LLM-Powered Booking Analytics & QA System  

## 🚀 Overview  
This project processes hotel booking data, extracts insights, and provides **retrieval-augmented question answering (RAG)** capabilities. It enables users to analyze trends, cancellation rates, and booking patterns while allowing natural language queries using an **open-source LLM**.  

## 🔧 Features  
- **Data Collection & Preprocessing**: Handles missing values, formats inconsistencies, and structures data.  
- **Analytics & Reporting**: Generates insights like revenue trends, cancellation rates, and lead time distribution.  
- **Retrieval-Augmented Question Answering (RAG)**: Uses a vector database to store embeddings for querying with LLMs.  
- **REST API**: Flask/FastAPI/Django-based API for analytics and Q&A.  
- **Performance Optimization**: Measures response times and improves retrieval efficiency.  


## 📊 Data Preprocessing  
1. Load dataset (CSV/JSON).  
2. Clean missing values & standardize formats.  
3. Store structured data (e.g., Pandas DataFrame, SQLite).  

## 📈 Analytics & Insights  
- **Revenue Trends**: Total revenue over time.  
- **Cancellation Rate**: % of total bookings canceled.  
- **Geographical Distribution**: Bookings by user location.  
- **Lead Time Analysis**: Days between booking and check-in.  

## 🔍 Retrieval-Augmented Q&A  
- Uses **FAISS/ChromaDB/Weaviate** for vector storage.  
- Supports open-source LLMs (**Llama 2, Falcon, GPT-Neo**).  
- Sample queries:  
  - `"Show me total revenue for July 2017."`  
  - `"Which locations had the highest booking cancellations?"`  
  - `"What is the average price of a hotel booking?"`  

## 🌐 API Endpoints  
| Method | Endpoint | Description |  
|--------|---------|-------------|  
| `POST` | `/analytics` | Returns booking insights |  
| `POST` | `/ask` | Answers questions using LLM |  
| `GET` | `/health` | Checks system status |  

## 🛠️ Installation & Setup  
### **1. Clone the Repository**  
```bash
git clone https://github.com/yourusername/LLM_Booking_Analytics_QA.git
cd LLM_Booking_Analytics_QA
```

### **2. Install Dependencies**  
```bash
pip install -r requirements.txt
```

### **3. Run the API Server**  
```bash
python api.py
```
The API runs on **http://localhost:5000** (Flask) or **http://localhost:8000** (FastAPI).  

## 🧪 Testing  
```bash
pytest tests/
```

## 📦 Deployment  
Using **Docker**:  
```bash
docker build -t booking-qa .
docker run -p 5000:5000 booking-qa
```

## 🎯 Bonus Features  
✅ Real-time data updates (SQLite/PostgreSQL)  
✅ Query history tracking  
✅ Health check API (`/health`)  

---

### 📬 Contact  
For queries, feel free to reach out at **your-email@example.com**  

---

