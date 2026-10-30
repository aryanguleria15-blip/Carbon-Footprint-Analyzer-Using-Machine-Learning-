# 🌍 Carbon Footprint Tracker

An interactive web app that helps users estimate their monthly carbon footprint based on lifestyle habits — including travel, home energy use, diet, waste, and shopping behavior.  
Built using **FastAPI**, **React**, and **Machine Learning**.

---

## 🧭 Categories

The app collects user data across key lifestyle areas:

| Category | Example Inputs |
|--------|----------------|
| 🚗 **Travel & Transport** | Daily travel distance, transport mode (car/bus/bike), fuel type, carpooling habits |
| 🏠 **Home Energy** | Monthly electricity usage, AC usage, renewable energy sources, number of household members |
| 🍔 **Food & Diet** | Meat & dairy consumption, vegetarian/vegan preference, locally sourced foods |
| ♻️ **Waste & Water** | Waste generation, recycling habits, water usage, composting |
| 🛍️ **Lifestyle Extras** | Shopping frequency, online orders, electronics usage, fast fashion purchase rate |

---

## 💻 Website

<img width="1281" height="914" alt="image" src="https://github.com/user-attachments/assets/8b225412-5f8d-438b-a785-aaf84cdb0f9c" />
<img width="1200" height="890" alt="image" src="https://github.com/user-attachments/assets/27694d48-e472-4d69-b36c-614e02a25d8f" />


---

## 🧮 How It Works

### 1. **Frontend (React / Lovable)**
- Collects user inputs via sliders and dropdowns.
- Sends the data to the FastAPI backend through an API request.

### 2. **Backend (FastAPI)**
- Loads a trained ML model (`footprint_model.pkl`)
- Encodes categorical inputs
- Predicts estimated **carbon footprint (kg CO₂/month)**
- Returns the result as JSON

### 3. **Machine Learning Model**
- Regression model trained on environmental behavior data (custom or Kaggle-based)
- Uses emission factors to estimate total footprint

---

## ☁️ Cloud Deployment

- 🌐 **CloudFront**:  
  [d287uxhqqx2zdu.cloudfront.net](https://d287uxhqqx2zdu.cloudfront.net)

- 🌐 **EC2 Instance:**
  [35.154.53.38](http://35.154.53.38)

- 🌐 **S3:**
  [http://sruja-carbon-tracker.s3-website.ap-south-1.amazonaws.com](http://sruja-carbon-tracker.s3-website.ap-south-1.amazonaws.com)



