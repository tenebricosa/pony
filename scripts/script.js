$(function() {
    var source   = $("#pony-template").html();
    var template = Handlebars.compile(source);

    function generatePonies() {
        var name = ['Твайлайт', 'Эпплджек', 'Рэйнбоу Дэш', 'Рэрити', 'Флаттершай', 'Пинки Пай', 'Спайк'],
            color = ['Фиолетовый', 'Оранжевый', 'Голубой', 'Белый', 'Желтый', 'Розовый', 'Сиреневый'],
            kind = ['Земная пони', 'Единорог', 'Пегас', 'Аликорн'],
            ponies = new Array(100),
            max_pice = 100,
            min_price = 1;

        for (var i = 0; i < ponies.length; i++) {
            ponies[i] = {
                'name': name[Math.round(Math.random() * (name.length - 1))],
                'color': color[Math.round(Math.random() * (color.length - 1))],
                'kind': kind[Math.round(Math.random() * (kind.length - 1))],
                'price': (Math.random() * (max_pice - min_price) + min_price).toFixed(2),
                'is_new': (Math.round(Math.random()) == 1 ? 'Да' : 'Нет'),
                'dom': 'ponies-' + i
            };
            var node = $(template(ponies[i])).appendTo('.pony__container');
            ponies[i].node = node;
        }
        return togglePopup(ponies);
    };

    function togglePopup(ponies) {
        $('.pony__link').on('click', function() {
            $('.pony__container').show();
            $('.pony__overlay').show();
        })

        $('.pony__overlay').on('click', function() {
            if (!$(this).is(':visible'))
                return;
            $(this).hide();
            $('.pony__container').hide();
        })

        var ponies_random = new Array(20);
        for (var i = 0; i < ponies_random.length; i++) {
            ponies[i].node.show();
        }

        return findPonies(ponies);
    };
    
    function findPonies(ponies) {
        $('#pony-form').on('submit', function(e) {
            e.preventDefault();
            var data = $(this).serializeArray();
            var row = 0;
            for (var i = 0; i < ponies.length; i++) {
                var show = true;
                for (var j = 0; j < data.length; j++) {
                    var value = data[j].value;
                    switch (data[j].name) {
                        case 'is_new':
                            show = show && (ponies[i]['is_new'] == (value == 'on' ? 'Да' : 'Нет'))
                            break;
                        case 'min':
                            if (value)
                                show = show && ponies[i].price > parseFloat(value)
                            break;
                        case 'max':
                            if (value)
                                show = show && ponies[i].price < parseFloat(value)  
                            break;
                        default:
                            if(value)
                                show = show && ponies[i][data[j].name] == value
                            break;
                    }
                }
                if (show)
                    row++;

                if (row > 20)
                    show = false;

                ponies[i].node.toggle(show);

            }
        })
    };

    generatePonies();
})
