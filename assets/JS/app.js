$(function() {
    const $btnUp = $('#btn-up');

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 300) {
            $btnUp.fadeIn(300);
        } else {
            $btnUp.fadeOut(300);
        }
    });

    $btnUp.on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    const $html = $('html');
    const $themeToggle = $('#theme-toggle');
    const $themeIcon = $themeToggle.find('.theme-icon');
    const $themeText = $themeToggle.find('.theme-text');

    function applyTheme(theme) {
        $html.addClass('theme-transitioning');
        
        if (theme === 'dark') {
            $html.attr('data-bs-theme', 'dark');
            $themeIcon.removeClass('bi-moon-fill').addClass('bi-sun-fill text-warning');
            $themeText.text('Modo Claro');
            $themeToggle.removeClass('btn-outline-primary').addClass('btn-outline-light');
        } else {
            $html.attr('data-bs-theme', 'light');
            $themeIcon.removeClass('bi-sun-fill text-warning').addClass('bi-moon-fill');
            $themeText.text('Modo Oscuro');
            $themeToggle.removeClass('btn-outline-light').addClass('btn-outline-primary');
        }

        localStorage.setItem('theme', theme);

        setTimeout(() => {
            $html.removeClass('theme-transitioning');
        }, 400);
    }

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    if (initialTheme === 'dark') {
        $html.attr('data-bs-theme', 'dark');
        $themeIcon.removeClass('bi-moon-fill').addClass('bi-sun-fill text-warning');
        $themeText.text('Modo Claro');
        $themeToggle.removeClass('btn-outline-primary').addClass('btn-outline-light');
    } else {
        $html.attr('data-bs-theme', 'light');
        $themeIcon.removeClass('bi-sun-fill text-warning').addClass('bi-moon-fill');
        $themeText.text('Modo Oscuro');
        $themeToggle.removeClass('btn-outline-light').addClass('btn-outline-primary');
    }

    $themeToggle.on('click', function() {
        const currentTheme = $html.attr('data-bs-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    $('#download-cv').on('click', function() {
        const pdfUrl = 'assets/CV-arnaldoMorales_js.pdf';
        const $btn = $(this);
        const originalHtml = $btn.html();
        
        $btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Descargando...');
        
        fetch(pdfUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo encontrar el archivo del CV');
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'CV_Arnaldo_Morales_JS.pdf';
                document.body.appendChild(a);
                a.click();
                
                setTimeout(() => {
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                }, 100);
            })
            .catch(error => {
                console.error('Error al descargar el CV:', error);
                alert('No se pudo descargar el CV. Por favor verifica que el archivo "assets/CV-arnaldoMorales_js.pdf" exista en el proyecto.');
            })
            .finally(() => {
                $btn.prop('disabled', false).html(originalHtml);
            });
    });

    const forms = $('.needs-validation');
    forms.on('submit', function(event) {
        const form = this;
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        $(form).addClass('was-validated');
    });

});