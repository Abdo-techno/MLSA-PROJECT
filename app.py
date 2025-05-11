from flask import Flask, render_template, request
import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)

# Load model and scaler
model = joblib.load("rf_model.joblib")
scaler = joblib.load("scaler.joblib")

FEATURES = [
    'gender', 'tenure', 'InternetService', 'OnlineBackup', 'TechSupport',
    'Contract', 'PaymentMethod', 'MonthlyCharges', 'TotalCharges', 'AvgChargesPerMonth'
]

label_cols = [
    'gender', 'InternetService', 'OnlineBackup', 'TechSupport',
    'Contract', 'PaymentMethod'
]

label_encoders = {col: LabelEncoder() for col in label_cols}
label_encoders['gender'].fit(['Male', 'Female'])
label_encoders['InternetService'].fit(['DSL', 'Fiber optic', 'No'])
label_encoders['OnlineBackup'].fit(['No', 'Yes'])
label_encoders['TechSupport'].fit(['No', 'Yes'])
label_encoders['Contract'].fit(['Month-to-month', 'One year', 'Two year'])
label_encoders['PaymentMethod'].fit(['Electronic check', 'Mailed check', 'Bank transfer', 'Credit card'])

DEFAULT_VALUES = {
    'gender': 'Male',
    'tenure': '12',
    'InternetService': 'DSL',
    'OnlineBackup': 'No',
    'TechSupport': 'No',
    'Contract': 'Month-to-month',
    'PaymentMethod': 'Electronic check',
    'MonthlyCharges': '50.00',
    'TotalCharges': '',
    'AvgChargesPerMonth': ''
}

@app.route('/')
def home():
    return render_template('index.html', input_data=DEFAULT_VALUES)

@app.route('/predict', methods=['POST'])
def predict():
    form_data = request.form.to_dict()

    try:
        # Handle missing or invalid numeric values
        try:
            form_data['TotalCharges'] = float(form_data['TotalCharges'])
        except (ValueError, TypeError):
            form_data['TotalCharges'] = float(form_data.get('tenure', 0)) * float(form_data.get('MonthlyCharges', 0))

        try:
            form_data['AvgChargesPerMonth'] = float(form_data['AvgChargesPerMonth'])
        except (ValueError, TypeError):
            form_data['AvgChargesPerMonth'] = float(form_data.get('MonthlyCharges', 0))

        input_data = {}
        for col in FEATURES:
            val = form_data.get(col, DEFAULT_VALUES.get(col, 0))
            if col in label_cols:
                input_data[col] = label_encoders[col].transform([val])[0]
            else:
                input_data[col] = float(val)

        input_df = pd.DataFrame([input_data])

        # Apply scaling to the required features
        scaled_columns = ['MonthlyCharges', 'TotalCharges', 'AvgChargesPerMonth']
        input_df[scaled_columns] = scaler.transform(input_df[scaled_columns])

        input_df = input_df[model.feature_names_in_]

        prediction = model.predict(input_df)[0]
        probability = round(model.predict_proba(input_df)[0][1] * 100, 2)

        return render_template('index.html',
                               prediction=prediction,
                               probability=probability,
                               input_data=form_data)

    except Exception as e:
        return render_template('index.html',
                               error=f"Error: {str(e)}",
                               input_data=form_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))

