// ACL Heal - Mental Health Screening Tools
// Implements PHQ-9, GAD-7, ACL-RSI scoring
// All calculations happen locally - no data is transmitted

// PHQ-9 Depression Screening Calculator
function calculatePHQ9() {
    const form = document.getElementById('phq9-form');
    const resultDiv = document.getElementById('phq9-result');

    // Check if all questions are answered
    let allAnswered = true;
    let totalScore = 0;
    let question9Value = 0;

    for (let i = 1; i <= 9; i++) {
        const questionName = `phq${i}`;
        const selected = form.querySelector(`input[name="${questionName}"]:checked`);

        if (!selected) {
            allAnswered = false;
            break;
        }

        const value = parseInt(selected.value);
        totalScore += value;

        if (i === 9) {
            question9Value = value;
        }
    }

    if (!allAnswered) {
        alert('Please answer all 9 questions before calculating your score.');
        return;
    }

    // Check for crisis (Question 9 positive response)
    if (question9Value > 0) {
        showCrisisAlert();
        // Still show results, but crisis takes priority
    }

    // Display results
    displayPHQ9Results(totalScore, question9Value);

    // Scroll to results
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function displayPHQ9Results(score, q9Value) {
    const resultDiv = document.getElementById('phq9-result');

    // Determine severity
    let severity, severityClass, interpretation, recommendations;

    if (score <= 4) {
        severity = 'Minimal Depression';
        severityClass = 'minimal';
        interpretation = 'Your score suggests minimal or no depressive symptoms. This is within the normal range for ACL recovery.';
        recommendations = [
            'Continue using healthy coping strategies',
            'Maintain social connections and support systems',
            'Monitor your mood with regular check-ins',
            'Focus on physical recovery with confidence'
        ];
    } else if (score <= 9) {
        severity = 'Mild Depression';
        severityClass = 'mild';
        interpretation = 'Your score suggests mild depressive symptoms. This is common during ACL recovery, especially weeks 1-6 post-surgery.';
        recommendations = [
            'Implement self-help strategies from the coping section above',
            'Increase social support and peer connection',
            'Set small, achievable daily goals',
            'Use psychoeducation resources',
            'Consider digital mental health tools (apps like Headspace, Calm)',
            'Monitor symptoms - if worsening, seek professional evaluation'
        ];
    } else if (score <= 14) {
        severity = 'Moderate Depression';
        severityClass = 'moderate';
        interpretation = 'Your score suggests moderate depressive symptoms. <strong>Professional evaluation is recommended.</strong>';
        recommendations = [
            '<strong>→ Speak with your physician or physical therapist about a mental health referral</strong>',
            'Consider therapy (Cognitive Behavioral Therapy or Acceptance & Commitment Therapy)',
            'Implement intensive self-help strategies',
            'Join a peer support group for ACL recovery',
            'Discuss with your healthcare team - depression can affect physical recovery',
            'Monitor closely - if symptoms worsen, seek help immediately'
        ];
    } else if (score <= 19) {
        severity = 'Moderately Severe Depression';
        severityClass = 'severe';
        interpretation = 'Your score suggests moderately severe depressive symptoms. <strong>Professional mental health treatment is strongly recommended.</strong>';
        recommendations = [
            '<strong>→ Seek professional mental health evaluation soon</strong>',
            '<strong>→ Contact a therapist or your physician for referral</strong>',
            'May benefit from combination of therapy + medication',
            'Require close monitoring by healthcare providers',
            'Inform your PT and surgeon - they need to know',
            'Consider whether surgery should be delayed if preoperative',
            'Use crisis resources (988, 911) if symptoms become overwhelming'
        ];
    } else {
        severity = 'Severe Depression';
        severityClass = 'severe';
        interpretation = 'Your score suggests severe depressive symptoms. <strong>Immediate professional mental health treatment is essential.</strong>';
        recommendations = [
            '<strong>→ Seek professional help immediately</strong>',
            '<strong>→ Contact a mental health provider today</strong>',
            '<strong>→ Call 988 if you\'re in crisis or having thoughts of self-harm</strong>',
            'Likely need combination of therapy and medication',
            'May require intensive outpatient or inpatient treatment',
            'Close collaboration between mental health and orthopedic teams needed',
            'Do not face this alone - help is available and effective'
        ];
    }

    // Build result HTML
    let resultHTML = `
        <div class="result-header">${severity}</div>
        <div class="result-score">Score: ${score} / 27</div>
        <div class="result-interpretation">${interpretation}</div>
    `;

    // Add crisis warning if Question 9 was positive
    if (q9Value > 0) {
        resultHTML += `
            <div class="crisis-warning" style="background-color: #fee2e2; border-left: 4px solid #dc2626; padding: 1rem; margin: 1rem 0; border-radius: 6px;">
                <h4 style="color: #dc2626; margin-bottom: 0.5rem;">⚠️ IMMEDIATE ATTENTION REQUIRED</h4>
                <p style="color: #991b1b; margin-bottom: 0.5rem;"><strong>You indicated thoughts of self-harm or being better off dead.</strong> This requires immediate professional evaluation.</p>
                <p style="color: #991b1b; margin-bottom: 0.5rem;"><strong>Call 988 (Suicide & Crisis Lifeline) or 911 now.</strong></p>
                <p style="color: #991b1b; font-size: 0.9rem;">Crisis support is available 24/7. You do not have to face this alone.</p>
            </div>
        `;
    }

    resultHTML += `
        <div class="result-recommendations">
            <h4>Recommended Actions:</h4>
            <ul>
                ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
    `;

    resultHTML += `
        <div style="margin-top: 1.5rem; padding: 1rem; background-color: #fef3c7; border-radius: 6px;">
            <p style="font-size: 0.95rem; color: #78350f;"><strong>Important:</strong> This screening tool is for educational purposes only and cannot diagnose depression. Only a qualified healthcare professional can diagnose and treat mental health conditions. Please discuss these results with your doctor or therapist.</p>
        </div>
    `;

    resultDiv.innerHTML = resultHTML;
    resultDiv.className = `screening-result ${severityClass}`;
    resultDiv.style.display = 'block';
}

function showCrisisAlert() {
    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        z-index: 10000;
        max-width: 500px;
        border: 3px solid #dc2626;
    `;

    alertBox.innerHTML = `
        <h2 style="color: #dc2626; margin-bottom: 1rem; font-size: 1.5rem;">⚠️ Crisis Support Needed</h2>
        <p style="margin-bottom: 1rem; font-size: 1.1rem;"><strong>You indicated thoughts of self-harm or being better off dead.</strong></p>
        <p style="margin-bottom: 1rem;">Please reach out for help immediately:</p>
        <div style="background-color: #fee2e2; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
            <p style="margin-bottom: 0.5rem;"><strong style="font-size: 1.5rem;">988</strong> - Suicide & Crisis Lifeline (call or text)</p>
            <p style="margin-bottom: 0.5rem;"><strong style="font-size: 1.5rem;">911</strong> - Emergency Services</p>
            <p><strong>741-741</strong> - Crisis Text Line (text "MHA")</p>
        </div>
        <p style="font-size: 0.95rem; margin-bottom: 1rem;">Crisis support is available 24/7. You do not have to face this alone. Help is available and recovery is possible.</p>
        <button onclick="this.parentElement.remove()" style="background-color: #2563eb; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; width: 100%;">I Understand - Show My Results</button>
    `;

    // Add backdrop
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 9999;
    `;

    backdrop.onclick = () => {
        backdrop.remove();
        alertBox.remove();
    };

    document.body.appendChild(backdrop);
    document.body.appendChild(alertBox);
}

// Future functions for other screening tools

function calculateGAD7() {
    // GAD-7 Anxiety screening - to be implemented
    console.log('GAD-7 calculation coming soon');
}

function calculateACLRSI() {
    // ACL Return to Sport after Injury scale - to be implemented
    console.log('ACL-RSI calculation coming soon');
}

function calculateTSK11() {
    // Tampa Scale of Kinesiophobia - to be implemented
    console.log('TSK-11 calculation coming soon');
}

// Privacy notice
console.log('ACL Heal Screening Tools loaded. All calculations performed locally - no data transmitted.');
