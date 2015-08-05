$(function() {
    var source   = $("#pony-template").html();
    var template = Handlebars.compile(source);

    var name = ['Твайлайт', 'Эпплджек', 'Рэйнбоу Дэш', 'Рэрити', 'Флаттершай', 'Пинки Пай', 'Спайк'],
        color = ['Фиолетовый', 'Оранжевый', 'Голубой', 'Белый', 'Желтый', 'Розовый', 'Сиреневый'],
        kind = ['Земная пони', 'Единорог', 'Пегас', 'Аликорн'],
        ponies = new Array(100),
        max_pice = 100,
        min_price = 1,
        row = new Array(ponies.length),
        ponies_visible = new Array(20);

    for (var i = 0; i < ponies.length; i++) {
        ponies[i] = {
            'name': name[Math.round(Math.random() * (name.length - 1))],
            'color': color[Math.round(Math.random() * (color.length - 1))],
            'kind': kind[Math.round(Math.random() * (kind.length - 1))],
            'price': (Math.random() * (max_pice - min_price) + min_price).toFixed(2),
            'is_new': Math.round(Math.random()) == 1
        };

        row[i] = {
            name: ponies[i].name,
            color: ponies[i].color,
            kind: ponies[i].kind,
            price: ponies[i].price,
            is_new: ponies[i].is_new
        };
    }

    for (var i = 0; i < ponies_visible.length; i++) {
        $('.pony__container').append(template(row[i]));
    }

    $('.pony__link').on('click', function() {
        $('.pony__container').removeClass('pony__container--hidden');
        $('.pony__overlay').removeClass('pony__overlay--hidden');
    })

	$('.pony__overlay').on('click', function() {
		if (!$(this).is(':visible'))
			return;
		$(this).addClass('pony__overlay--hidden');
		$('.pony__container').addClass('pony__container--hidden');
	})

})
