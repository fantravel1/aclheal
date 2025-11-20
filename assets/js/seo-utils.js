// SEO Utilities for ACL Heal
// Handles JSON-LD structured data, Open Graph, and Twitter Cards

const SEO = {
    siteUrl: 'https://aclheal.com',
    siteName: 'ACL Heal',
    defaultImage: '/assets/images/og-default.jpg',
    twitterHandle: '@aclheal',

    // Add JSON-LD structured data
    addStructuredData: function(data) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(data);
        document.head.appendChild(script);
    },

    // Add Organization schema (for all pages)
    addOrganizationSchema: function() {
        const schema = {
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "about": {
                "@type": "MedicalCondition",
                "name": "Anterior Cruciate Ligament (ACL) Injury",
                "alternateName": "ACL Tear"
            },
            "publisher": {
                "@type": "Organization",
                "name": "ACL Heal",
                "url": this.siteUrl,
                "logo": {
                    "@type": "ImageObject",
                    "url": this.siteUrl + "/assets/images/logo.png"
                }
            },
            "audience": {
                "@type": "PatientsAudience",
                "healthCondition": {
                    "@type": "MedicalCondition",
                    "name": "ACL Injury"
                }
            }
        };
        this.addStructuredData(schema);
    },

    // Add Breadcrumb schema
    addBreadcrumbSchema: function(breadcrumbs) {
        const itemListElement = breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": this.siteUrl + item.url
        }));

        const schema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": itemListElement
        };
        this.addStructuredData(schema);
    },

    // Add Article/MedicalWebPage schema
    addArticleSchema: function(config) {
        const schema = {
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "headline": config.headline,
            "description": config.description,
            "url": this.siteUrl + config.url,
            "datePublished": config.datePublished || "2024-11-20",
            "dateModified": config.dateModified || "2024-11-20",
            "author": {
                "@type": "Person",
                "name": config.author || "Nolan Ambrosino"
            },
            "publisher": {
                "@type": "Organization",
                "name": "ACL Heal",
                "logo": {
                    "@type": "ImageObject",
                    "url": this.siteUrl + "/assets/images/logo.png"
                }
            },
            "about": {
                "@type": "MedicalCondition",
                "name": "ACL Injury Recovery"
            },
            "medicalAudience": [{
                "@type": "Patient"
            }]
        };

        if (config.image) {
            schema.image = {
                "@type": "ImageObject",
                "url": this.siteUrl + config.image
            };
        }

        this.addStructuredData(schema);
    },

    // Add FAQ schema
    addFAQSchema: function(faqs) {
        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
        this.addStructuredData(schema);
    },

    // Initialize SEO for a page
    initPage: function(config) {
        // Add canonical URL if not exists
        if (!document.querySelector('link[rel="canonical"]') && config.url) {
            const canonical = document.createElement('link');
            canonical.rel = 'canonical';
            canonical.href = this.siteUrl + config.url;
            document.head.appendChild(canonical);
        }

        // Add Open Graph tags
        this.addOpenGraphTags(config);

        // Add Twitter Card tags
        this.addTwitterCardTags(config);

        // Add structured data
        this.addOrganizationSchema();

        if (config.article) {
            this.addArticleSchema(config.article);
        }

        if (config.breadcrumbs) {
            this.addBreadcrumbSchema(config.breadcrumbs);
        }

        if (config.faqs) {
            this.addFAQSchema(config.faqs);
        }
    },

    // Add Open Graph meta tags
    addOpenGraphTags: function(config) {
        const ogTags = {
            'og:site_name': this.siteName,
            'og:type': config.type || 'website',
            'og:url': this.siteUrl + (config.url || ''),
            'og:title': config.title || document.title,
            'og:description': config.description || document.querySelector('meta[name="description"]')?.content || '',
            'og:image': this.siteUrl + (config.image || this.defaultImage),
            'og:image:width': '1200',
            'og:image:height': '630',
            'og:image:alt': config.imageAlt || config.title || 'ACL Heal - ACL Recovery Resource'
        };

        Object.entries(ogTags).forEach(([property, content]) => {
            if (content && !document.querySelector(`meta[property="${property}"]`)) {
                const meta = document.createElement('meta');
                meta.setAttribute('property', property);
                meta.setAttribute('content', content);
                document.head.appendChild(meta);
            }
        });
    },

    // Add Twitter Card meta tags
    addTwitterCardTags: function(config) {
        const twitterTags = {
            'twitter:card': 'summary_large_image',
            'twitter:site': this.twitterHandle,
            'twitter:title': config.title || document.title,
            'twitter:description': config.description || document.querySelector('meta[name="description"]')?.content || '',
            'twitter:image': this.siteUrl + (config.image || this.defaultImage),
            'twitter:image:alt': config.imageAlt || config.title || 'ACL Heal - ACL Recovery Resource'
        };

        Object.entries(twitterTags).forEach(([name, content]) => {
            if (content && !document.querySelector(`meta[name="${name}"]`)) {
                const meta = document.createElement('meta');
                meta.setAttribute('name', name);
                meta.setAttribute('content', content);
                document.head.appendChild(meta);
            }
        });
    }
};

// Make SEO utilities globally available
window.ACLHealSEO = SEO;
