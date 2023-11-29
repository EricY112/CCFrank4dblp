/**
 * MIT License
 *
 * Copyright (c) 2019-2023 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp), mra42 (https://github.com/mra42)
 */

const scholar = {};

scholar.rankSpanList = [];

scholar.run = function () {
    let url = window.location.pathname;
    if (url == "/scholar") {
        scholar.appendRank();
    } else if (url == "/citations") {
        setInterval(function () {
            $(window).bind("popstate", function () {
                scholar.appendRanks();
            });
            scholar.appendRanks();
        }, 2000);
    }
};

scholar.appendRank = function () {
    let elements = $("#gs_res_ccl_mid > div > div.gs_ri");
    elements.each(function( index ) {
        let node = $(this).find("h3 > a");
        if (!node.next().hasClass("ccf-rank")) {
            let title = node.text();
            let data = $(this)
                .find("div.gs_a")
                .text()
                .replace(/[\,\-\…]/g, "")
                .split(" ");
            let author = data[1];
            let year = data.slice(-3)[0];
            setTimeout(function() {
                fetchRank(node, title, author, year, scholar);
            }, 100 * index );
        }
    });
};

scholar.appendRanks = function () {
    let elements = $("tr.gsc_a_tr");
    elements.each(function( index ) {
        let node = $(this).find("td.gsc_a_t > a").first();
        if (!node.next().hasClass("ccf-rank")) {
            let title = node.text();
            let author = $(this)
                .find("div.gs_gray")
                .text()
                .replace(/[\,\…]/g, "")
                .split(" ")[1];
            let year = $(this).find("td.gsc_a_y").text();
            setTimeout(function() {
                fetchRank(node, title, author, year, scholar);
            }, 100 * index );
        }
    });
};
