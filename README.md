<table align="center">
  <tr>
    <td><img src="images/mlsa-logo.png" alt="MLSA Logo" width="150" /></td>
    <td width="500"></td> 
    <td><img src="images/TMP-png.png" alt="University Logo" width="150" /></td>
  </tr>
</table>

<h2 align="center">📊 MLSA-PROJECT — Customer Churn Prediction Web App</h2>





![Made with ❤️ by MLSA](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F%20by%20MLSA-blueviolet)
![Open Source](https://img.shields.io/badge/Status-Open--Source-brightgreen)
![Python](https://img.shields.io/badge/Made%20with-Python-3776AB?logo=python)
![GitHub Repo size](https://img.shields.io/github/repo-size/Abdo-techno/MLSA-PROJECT)
![GitHub stars](https://img.shields.io/github/stars/Abdo-techno/MLSA-PROJECT?style=social)
 
This is a Flask-based web application that predicts whether a customer is likely to churn (leave a service) based on their service usage and contract information. The model is trained using a **Random Forest Classifier** and provides both the prediction and the probability of churn.

---

## 🏗️ Project Architecture

```
MLSA-PROJECT/
├── Data/
│   └── Final Project MLSA- Dataset.csv
├── Note_Book/
│   └── Customer Churn Prediction.ipynb
├── PDF_FILES/
│   ├── Final Project- MLSA.pdf
│   ├── MLSA.pdf
│   └── MLSA.pptx
├── images/
│   ├── output.png
│   └── screenshot.png
├── static/
│   ├── css/
│   ├── js/
│   └── images/
├── templates/
│   └── index.html
├── app.py
├── rf_model.joblib
├── scaler.joblib
├── requirements.txt
├── Procfile
└── README.md
```

---

## 🔄 Workflow

```
User Input → Flask (app.py) → Preprocessing → Model Prediction → Output
```

---

## 🚀 Features

* 🔍 **Churn Prediction** — Predict whether a customer will churn based on input data.
* 📈 **Probability Score** — Displays the confidence percentage for each prediction.
* 🎛️ **Auto-fill Defaults** — Pre-filled default values for quick testing.
* ✅ **Input Validation & Handling** — Handles missing or invalid values intelligently.
* 💡 **Label Encoding & Scaling** — Categorical and numerical preprocessing are applied consistently.

---

## 🛠️ Technologies Used

* **Flask** — Web framework for Python.
* **scikit-learn** — For model training and preprocessing.
* **Pandas** — Data manipulation.
* **Joblib** — Model and scaler serialization.
* **HTML + Jinja2** — For frontend templating.

---

## 🧠 Machine Learning Model

* **Model:** Random Forest Classifier
* **Target Variable:** `Churn` (Yes/No)
* **Features Used:**

  * Gender
  * Tenure
  * Internet Service
  * Online Backup
  * Tech Support
  * Contract Type
  * Payment Method
  * Monthly Charges
  * Total Charges
  * Average Charges per Month

---

## 📷 Screenshot

![App Screenshot](images/output.png)

---

## 💻 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Abdo-techno/MLSA-PROJECT.git
cd MLSA-PROJECT
```

### 2. Create Virtual Environment & Install Dependencies

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Make Sure Required Files Are Present

* `rf_model.joblib`
* `scaler.joblib`
* `templates/index.html`

### 4. Run the App

```bash
python app.py
```

Then visit: [https://mlsa-project-production.up.railway.app](https://mlsa-project-production.up.railway.app)

---

## 📝 Example Input

| Feature           | Example Value  |
| ----------------- | -------------- |
| Gender            | Male           |
| Tenure            | 12             |
| Internet Service  | DSL            |
| Online Backup     | No             |
| Tech Support      | Yes            |
| Contract          | Month-to-month |
| Payment Method    | Credit card    |
| Monthly Charges   | 70.50          |
| Total Charges     | 846.00         |
| Avg Charges/Month | 70.50          |

---

## 📸 More Screenshots

| Interface              | Screenshot                           |
| ---------------------- | ------------------------------------ |
| Prediction Result Page | ![output](images/output.png)         |
| Web Form Input Page    | ![screenshot](images/screenshot.png) |

---

## 🙌 Credits

Developed by **MLSA Student Ambassadors**
Inspired by real-world business needs for customer retention.

---
