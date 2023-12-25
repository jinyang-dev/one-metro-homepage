$(function () {
    tips_modes = ['hover-slide-up', 'hover-slide-down', 'hover-slide-left', 'hover-slide-right', 'hover-zoom-up', 'hover-zoom-down', 'hover-zoom-left', 'hover-zoom-right'];

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function new_tile(id, title, icon_img, bg_color, size, url, news, tips) {
        style_config = ''
        class_config = 'one_tile'
        news_config = ''
        tips_config_mode = ''
        tips_config_decs = ''
        icon_config = ''
        if (bg_color.indexOf("bg-") == -1) {
            style_config = 'background-color: ' + bg_color
        } else {
            class_config = class_config + ' bg-' + bg_color
        }
        if (news != undefined) {
            news_config = '<span class="badge-bottom">' + news + '</span>'
        }
        if (tips != undefined) {
            class_config = class_config + ' slide-front'
            tips_config_mode = tips_modes[getRandom(0, tips_modes.length - 1)]
            tips_config_decs =
                '<div class="slide-back d-flex flex-justify-center flex-align-center p-4 op-mauve"> \
                <p class="text-center">'+ tips + '</p> \
            </div>';
            icon_config = '<div class="slide-front" style="display: grid;place-items: center;"> \
                <img src="'+ icon_img + '" style="height:33%"> \
            </div>';
        } else {
            icon_config = '<img src="' + icon_img + '" class="icon">';
        }

        return '<a id=' + id + ' href="' + url + '" data-role="tile" style="' + style_config + '" class="' + class_config + '" data-size="' + size + '" target="_blank" data-effect="' + tips_config_mode + '"> \
        ' + icon_config + '<span class="branding-bar">' + title + '</span>' + news_config + tips_config_decs + ' \
        </a>';
    }

    function new_countdown(id, title, dt) {
        if (dt != undefined && dt.search(/^\d\d:\d\d$/i) == 0) { // like 18:00
            var currentDateTime = new Date();
            var year = currentDateTime.getFullYear();
            var month = currentDateTime.getMonth() + 1; // 0-11
            var day = currentDateTime.getDate();
            dt = month + '/' + day + '/' + year + ' ' + dt; // should like 12/24/2023 18:00
        }

        count_down_config = '<div id="' + id + '" class="one_tile" data-role="tile" data-size="wide" style="background-color: #00aff0;"> \
            <div data-role="countdown" data-start="true" data-date="' + dt + '" data-cls-part="no-divider" \
            data-cls-days="bg-orange fg-white" data-cls-hours="bg-red fg-white" data-cls-minutes="bg-green fg-white" \
            data-cls-seconds="bg-blue fg-white" data-cls-zero="bg-light fg-lightGray"></div> \
            <span class="branding-bar">'+ title + '</span> \
        </div>';
        return count_down_config;
    }

    function fill_tiles(id, config) {
        target_tiles = config.items;
        for (i = 0; i < target_tiles.length; i++) {
            tile_id = 'tile_' + id + '_' + i;
            if (target_tiles[i].type == "countdown") {
                $("#" + id).append(new_countdown(tile_id, target_tiles[i].title, target_tiles[i].datetime));
            } else {
                $("#" + id).append(new_tile(tile_id, target_tiles[i].title, target_tiles[i].icon, target_tiles[i].color, target_tiles[i].size, target_tiles[i].url, target_tiles[i].news, target_tiles[i].tips));
            }
            $('#' + tile_id).fadeIn(1000 + (i * 100));
        }
        $("#" + id).attr("data-group-title", config.title);
        $("#" + id).addClass('size-' + config.width);
        $("#" + id).addClass('one-tiles-group');
    }

    function fill_live_images(config) {
        lives_html = '<div class="one_tile" data-role="tile" data-size="wide" data-effect="image-set">';
        live_item = '';
        target_tiles = config.images;
        for (i = 0; i < target_tiles.length; i++) {
            live_item = live_item + '<img src="' + target_tiles[i] + '">';
        }
        lives_html = lives_html + live_item + '</div>';
        $("#one_live_shows").addClass('size-' + config.width);
        $("#one_live_shows").append(lives_html);
        $("#one_live_shows").attr("data-group-title", config.title);
        $('#one_live_shows .one_tile').fadeIn(1000);
        $("#one_live_shows").addClass('one-tiles-group');
    }


    fetch('/config/one.json')
        .then(response => response.json())
        .then(config => {

            $('.one_tile').fadeIn(1000);

            // User
            $('#one_user').text(config.user);

            // Main
            fill_tiles("one_main_tiles", config.main_tiles);

            // Second
            fill_tiles("one_second_tiles", config.second_tiles);

            // Lives
            fill_live_images(config.lives);

            $('#one_start').fadeIn(3000);
        })
        .catch(error => console.error('Error:', error));
});