$(document).ready(function(){
  var player;
  function init(){
    var url = "http://dash.edgesuite.net/akamai/test/caption_test/ElephantsDream/elephants_dream_480p_heaac5_1.mpd";
    var context = new Dash.di.DashContext();
    player = MediaPlayer(context);
    player.startup();
    player.attachView($(".dashjs-player")[0]);
    player.setAutoPlay(true);
    player.attachSource(url);
    setInterval(updateStats, 500);
  }

  function updateStats(){
    var metrics = player.getMetricsFor('video');
    var metricsExt = player.getMetricsExt();
    var bufferLevel = metricsExt.getCurrentBufferLevel(metrics);
    var currentHttpRequest = metricsExt.getCurrentHttpRequest(metrics);

    $('#stats').html("Buffer level " + bufferLevel.toPrecision(3) + 's');
    var currentUrl = "empty";
    var bytes = 0;
    if(currentHttpRequest){
      currentUrl = currentHttpRequest.actualurl;
      bytes = currentHttpRequest._bytes;
    }
    $('#currentUrl').html("Current Http Request URL: " + currentUrl);
    $('#currentBytes').html("Current Http Request Bytes: " + bytes);
  }

  init();
});