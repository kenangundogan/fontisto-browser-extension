function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            // console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch (err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

ajax_get('assets/json/fontisto-icon-list.json', function (data) {
    var html = '';
    for (var i = 0; i < data.fontisto.icons.length; i++) {
        html += '<li>';
        html += '<i id="fi" class= "fi fi-' + data.fontisto.icons[i].name + '"></i>';
        html += '<span class="name">' + data.fontisto.icons[i].name + '</span>';
        html += '<span class="unicode">' + data.fontisto.icons[i].unicode + '</span>';
        html += '</li>';
    }
    html += '';
    document.getElementById("icon-list").innerHTML = html;
});




$(document).ready(function () {
    console.log('%c' + 'fontisto', 'color:' + '#F75454;' + 'font-size:40px;' + 'font-weight:bold');
    console.log('Designed and built by kenan gündoğan');
    // icon modal detail
    $(document).on('click', '.icon-list li, .icon-modal .close', function (e) {
        e.preventDefault();
        var iconId = $(this).find("i").attr("class"),
            iconName = $(this).find(".name").text(),
            iconUnicode = $(this).find(".unicode").text(),
            categoryName = $(this).closest("ul").parent("li").find(".title").text();
        console.log(categoryName);
        if ($(".icon-modal").is(".show")) {
            $(".icon-modal").removeClass("show");
        }
        else {
            $(".icon-modal").addClass("show");
            $(".icon-modal .left i").removeAttr("class").addClass(iconId);
            $(".icon-modal .name").text(iconName);
            $(".icon-modal .unicode").text('"' + '\\' + iconUnicode + '"');
            $(".icon-modal code .class-p").text(iconId);
            $(".icon-modal .description .category-name").text(categoryName);
        }
    });

    $(document).click(function (e) {
        if (e.target.classList.contains('icon-detail')) {
            $(".icon-modal").removeClass("show");
        }
    });

    $(".icon-search .close").click(function () {
        $("#iconSearchInput").val('');
        $(".icon-search-result").removeAttr("style");
        $("#icon-search-result, .icon-list").removeAttr("style");
    });

    // clipbord text copy (plugin)
    $(".copy-btn").on('click', function (e) {
        $(".copy-btn").text("copy").removeClass("selected");
        $(this).text("copied").addClass("selected");
    });

    if ($(".copy-btn").length > 0) {
        console.log("true");
        var clipboard = new Clipboard('.copy-btn');

        clipboard.on('success', function (e) {
            console.log(e);
        });

        clipboard.on('error', function (e) {
            console.log(e);
        });
    }
    else {
        console.log("false");
    }

});

setTimeout(function () {
    var icons = {};
    $('.icon-list li').each(function () {
        icons[$(this).find('span.name').text()] = $(this).clone();
    });

    $('#iconSearchInput').on('input propertychange', function () {
        var term = this.value.toLowerCase(),
            matchedIcons = [];

        // if term is empty return back
        if (term == '') {
            $('#icon-search-result').hide();
            $('.icon-category-list').not('#icon-search-result .icon-category-list').show();
            return;
        } else {
            $('#icon-search-result').show();
            $('.icon-category-list').not('#icon-search-result .icon-category-list').hide();
        }

        $.each(icons, function (name, icon) {
            ;
            if (name.search(term) > -1) {
                matchedIcons.push(icon);
            }
        });

        // term text append to result div
        $('#icon-search-result .result i').text(term);
        $('#icon-search-result .icon-list').empty();
        $.each(matchedIcons, function (i, icon) {
            $(icon).appendTo('#icon-search-result .icon-list');
        });
    });
}, 1000);



