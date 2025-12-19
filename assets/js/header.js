// Unified Header Component for ACL Heal
// Ensures consistent navigation across all pages

document.addEventListener('DOMContentLoaded', function() {
    const headerHTML = `
    <!-- Crisis Banner -->
    <div class="crisis-banner" role="alert">
        <div class="container">
            <p><strong>Crisis Support:</strong> If you're experiencing a mental health crisis, call or text <strong>988</strong> (Suicide & Crisis Lifeline) or call <strong>911</strong></p>
        </div>
    </div>

    <!-- Header Navigation -->
    <header class="site-header">
        <div class="container">
            <nav class="main-nav" role="navigation" aria-label="Main navigation">
                <div class="logo">
                    <a href="/" aria-label="ACL Heal Home">ACL Heal</a>
                </div>
                <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav-menu" role="menubar">
                    <li class="dropdown" role="none">
                        <a href="/#recovery-stages" role="menuitem" aria-haspopup="true" aria-expanded="false">Recovery Stages</a>
                        <ul class="dropdown-menu" role="menu">
                            <li role="none"><a href="/stages/pre-surgery.html" role="menuitem">Pre-Surgery</a></li>
                            <li role="none"><a href="/stages/weeks-0-2.html" role="menuitem">Weeks 0-2: Immediate Post-Op</a></li>
                            <li role="none"><a href="/stages/weeks-2-6.html" role="menuitem">Weeks 2-6: Early Recovery</a></li>
                            <li role="none"><a href="/stages/weeks-6-12.html" role="menuitem">Weeks 6-12: Build Phase</a></li>
                            <li role="none"><a href="/stages/months-3-6.html" role="menuitem">Months 3-6: Advanced Rehab</a></li>
                            <li role="none"><a href="/stages/months-6-9.html" role="menuitem">Months 6-9: Return Prep</a></li>
                            <li role="none"><a href="/stages/months-9-12.html" role="menuitem">Months 9-12+: Return to Sport</a></li>
                            <li role="none"><a href="/stages/long-term.html" role="menuitem">Long-Term: 12-24+ Months</a></li>
                        </ul>
                    </li>
                    <li role="none"><a href="/exercises/" role="menuitem">Exercises</a></li>
                    <li class="dropdown" role="none">
                        <a href="/tools/" role="menuitem" aria-haspopup="true" aria-expanded="false">Tools</a>
                        <ul class="dropdown-menu" role="menu">
                            <li role="none"><a href="/tools/gad7.html" role="menuitem">GAD-7 Anxiety Screening</a></li>
                            <li role="none"><a href="/tools/acl-rsi.html" role="menuitem">ACL-RSI Readiness Scale</a></li>
                            <li role="none"><a href="/tools/return-to-sport-checklist.html" role="menuitem">Return-to-Sport Checklist</a></li>
                            <li role="none"><a href="/mental-health.html#phq9" role="menuitem">PHQ-9 Depression Screening</a></li>
                        </ul>
                    </li>
                    <li class="dropdown" role="none">
                        <a href="/guides/" role="menuitem" aria-haspopup="true" aria-expanded="false">Guides</a>
                        <ul class="dropdown-menu" role="menu">
                            <li role="none"><a href="/guides/" role="menuitem">Graft-Specific Guides</a></li>
                            <li role="none"><a href="/education/knee-anatomy.html" role="menuitem">Knee Anatomy & ACL</a></li>
                            <li role="none"><a href="/education/surgery-options.html" role="menuitem">Surgery & Graft Types</a></li>
                            <li role="none"><a href="/education/protocols.html" role="menuitem">Recovery Protocols</a></li>
                        </ul>
                    </li>
                    <li role="none"><a href="/faq.html" role="menuitem">FAQ</a></li>
                    <li role="none"><a href="/mental-health.html" class="highlight" role="menuitem">Mental Health</a></li>
                </ul>
            </nav>
        </div>
    </header>
    `;

    // Insert header at the beginning of body
    const headerContainer = document.getElementById('header-placeholder');
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
    } else {
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }

    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Dropdown menu accessibility
    const dropdowns = document.querySelectorAll('.dropdown > a');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                parent.classList.toggle('active');
            }
        });
    });
});
