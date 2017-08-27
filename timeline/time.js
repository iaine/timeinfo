var timeline;

timeline = function() {
    
    function createTimeIndex(divName) {
        
        function reqListener () {
            var worker = JSON.parse(this.response);
            data = worker.events;
            createIndex(worker.events, "");
        }
        var req = new XMLHttpRequest();
        req.addEventListener("load", reqListener);
        req.open("GET", "events.json");
        req.send();
    }
    
    function createIndex (data, author, div) {
        html = "<div id=\"indexTime\">";
        console.log(data);
        data.forEach( function (d) {
                     html += "<div id=\"Entry\" style=\"border-left: 1px solid black; margin-left:2%;padding:1%;\"><div id=\"entryName\"><strong>" + d.year + "</strong><div id=\"entries\">";
                     d.events.forEach( function (ev) { html += "<div>" + ev + "</div>";  });
                     d.books.forEach(
                        function (b) {
                          if (b.author === author) {
                                     html += '<div style="font-weight:bold" onmouseout="time.reset();">' + b.title + '</div>';
                          } else {
                            html += '<div onmouseenter="time.createIndex(data,\'' + b.author + '\');" onmouseout="time.reset();">' + b.title + '</div>';
                          }
                      });
                     
                     html += '</div></div></div>';
                     });
        chart.innerHTML = html + "</div>";
    }
    
    function reset() {
        return createIndex(data, '');
    }
    
    return {
    createIndex: createIndex,
    createTimeIndex: createTimeIndex,
    reset:reset
    }
}
