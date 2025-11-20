// Unified Footer Component for ACL Heal
// Ensures consistent footer across all pages

document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const lastUpdated = 'November 2024';

    const footerHTML = `
    <!-- Footer -->
    <footer class="site-footer" role="contentinfo">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>Recovery Stages</h4>
                    <ul>
                        <li><a href="/stages/pre-surgery.html">Pre-Surgery</a></li>
                        <li><a href="/stages/weeks-0-2.html">Weeks 0-2</a></li>
                        <li><a href="/stages/weeks-2-6.html">Weeks 2-6</a></li>
                        <li><a href="/stages/weeks-6-12.html">Weeks 6-12</a></li>
                        <li><a href="/stages/months-3-6.html">Months 3-6</a></li>
                        <li><a href="/stages/months-6-9.html">Months 6-9</a></li>
                        <li><a href="/stages/months-9-12.html">Months 9-12+</a></li>
                        <li><a href="/stages/long-term.html">Long-Term</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h4>Education</h4>
                    <ul>
                        <li><a href="/education/knee-anatomy.html">Knee Anatomy & ACL</a></li>
                        <li><a href="/education/surgery-options.html">Surgery & Grafts</a></li>
                        <li><a href="/education/protocols.html">Recovery Protocols</a></li>
                        <li><a href="/education/mental-health.html">Mental Health</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="/resources.html#exercises">Exercise Library</a></li>
                        <li><a href="/resources.html#practitioners">Find Practitioners</a></li>
                        <li><a href="/resources.html#protocols">Protocols</a></li>
                        <li><a href="/resources.html#research">Research</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="/mental-health.html">Mental Health Screening</a></li>
                        <li><a href="/crisis-resources.html">Crisis Resources</a></li>
                        <li><strong>988</strong> - Suicide & Crisis Lifeline</li>
                        <li><strong>911</strong> - Emergency Services</li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; ${currentYear} ACL Heal. Educational resource only—not medical advice. <a href="/disclaimer.html">Full Disclaimer</a> | <a href="/privacy.html">Privacy Policy</a></p>
                <p class="evidence-note">All protocols and recommendations are based on peer-reviewed research from 2023-2025. Last updated: ${lastUpdated}.</p>
            </div>
        </div>
    </footer>
    `;

    // Insert footer at the end of body
    const footerContainer = document.getElementById('footer-placeholder');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    } else {
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
});
