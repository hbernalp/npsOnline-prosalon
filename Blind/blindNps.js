<script>

    function add() {
        var el = document.createElement("div");
        el.className = "legend-horizontal"
        el.innerHTML = '<h4>Poco probable</h4><h4>Muy probable</h4>';

        var el2 = document.createElement("div");
        el2.className = "hs-form-field field temporal-select"
        //el2.innerHTML = '<label><span>Tienda Blind</span><span class="hs-form-required">*</span></label><div class="input"><select disabled="disabled"><option value="" disabled="" selected="">Escoge una ciudad</option></select></div>'
        //// el.appendChild(document.createTextNode('<div class="legend-horizontal"><h4>Poco probable</h4><h4>Muy probable</h4></div>'));
        document.getElementsByClassName('inputs-list multi-container')[0].parentElement.appendChild(el);
        //document.getElementsByClassName('hs_city')[0].parentElement.appendChild(el2);
        if (document.querySelector('input[name=blind_nps_option]:checked')) {
            var body = document.body;
            body.classList.remove("loading");
        }
    }

    function loop() {
        try {
            add();
            console.log("Agregado")
        } catch (err) {
            setTimeout(loop, 200)
            console.log("Esperando...")
        }
    }

    loop();

    /**
 *
 * Created by Borbás Geri on 12/17/13
 * Copyright (c) 2013 eppz! development, LLC.
 */
    var EPPZScrollTo = { 
        documentVerticalScrollPosition: function () 
        { 
            return self.pageYOffset ? self.pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0 
        }, viewportHeight: function () 
            { 
                return "CSS1Compat" === document.compatMode ? document.documentElement.clientHeight : document.body.clientHeight 
            }, documentHeight: function () 
                { 
                    return void 0 !== document.height ? document.height : document.body.offsetHeight 
                }, documentMaximumScrollPosition: function () 
                    { 
                        return this.documentHeight() - this.viewportHeight() 
                    }, elementVerticalClientPositionById: function (t) 
                        { 
                            return document.getElementById(t).getBoundingClientRect().top 
                        }, scrollVerticalTickToPosition: function (t, o) 
                            { 
                                var e = parseFloat(o) - parseFloat(t); 
                                Math.abs(e) <= .5 ? scrollTo(0, o) : (t = .8 * parseFloat(t) + .2 * parseFloat(o), scrollTo(0, Math.round(t)), setTimeout("EPPZScrollTo.scrollVerticalTickToPosition(" + t + ", " + o + ")", 1e3 / 60)) 
                            }, scrollVerticalToElementById: function (t, o) 
                                { 
                                    if (null != document.getElementById(t)) 
                                        { 
                                            var e = this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(t) - o, n = this.documentVerticalScrollPosition(), 
                                            i = this.documentMaximumScrollPosition(); 
                                            e > i && (e = i), 
                                            this.scrollVerticalTickToPosition(n, e) 
                                        } else 
                                        console.warn("Cannot find element with id '" + t + "'.") 
                                } };


    var body = document.body;
    body.classList.add("loading");
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://code.jquery.com/jquery-2.2.4.min.js';
    script.onload = funcionalidad;
    document.head.appendChild(script);

    function funcionalidad() {
        
        var newButton = $('<div class="hs-continue"><div class="actions"><input type="button" value="Continuar" class="hs-button primary large"></div></div>')
        newButton.find('input').on('click', function () {
            $('body').removeClass("loading").addClass("stepone");
            $(".hs_blind_nps_option")[0].id = "scrollTo";
            EPPZScrollTo.scrollVerticalToElementById('scrollTo', 20);
        });
        
        function addButton() {
            newButton.insertAfter($(".hs_blind_nps_option").parent());
        }
        addButton()

        $(document).on('input propertychange paste', ".hs_blind_nps_text1 textarea, .hs_blind_nps_text2 textarea, .hs_blind_nps_text3 textarea", 
        function () {
            if (this.value.length > 0) {
                $("body").addClass("valid");
            } else {
                $("body").removeClass("valid");
            }
            if ($(".hs-continue").length == 0) addButton();
        })

        var section2 = $(".hs-richtext, .hs_firstname, .hs_email, .hs_blind_documento, .hs_blind_telefono, .hs_city, .hs_blind_habeas_data, .hs_submit");

        // $(document).on('change', 'input[name=cromantic_feedback]', function () {
        //     $('body').removeClass("loading").addClass("stepone");
        //     $(".hs_cromantic_feedback")[0].id = "scrollTo";
        //     EPPZScrollTo.scrollVerticalToElementById('scrollTo', 20);
        // });
        $(document).on('change', 'input[name=blind_nps_option]', 
        function () {
            if ($(this).val()!=9 && $(this).val()!=10 && $(".hs_blind_nps_text1 textarea, .hs_blind_nps_text2 textarea, .hs_blind_nps_text3 textarea").val().length == 0)
                $("body").removeClass("valid");
            else 
                $("body").addClass("valid");
            if ($(".hs-continue").length == 0) addButton();
        });

        

        if (document.querySelector('input[name=blind_nps_option]:checked')) {
            $('body').removeClass("loading");
        }

        $(document).on('change', '.hs_blind_online_canal_de_compra select', 
        function () {
            $('.temporal-select').remove();
        });
    }
</script>