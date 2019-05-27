$(document).ready(function(){

  $('#dd-meni li ul').css({
    display: "none",
    left: "auto"
  });
  $('#dd-meni li').hover(function(){
      $(this).find('ul').stop(true,true).slideDown('slow');
    }, function(){
      $(this).find('ul').stop(true,true).fadeOut('fast');
    });

$.ajax({
  url : "putovanja.json",
  type : "GET",
  dataType : "json",
  success : function(data){
    dohvatiAjaxom(data);
  },
  error : function(xhr, status, error){
    console.log(error);
  }
});

$.ajax({
  url : "putovanja.json",
  type : "GET",
  dataType : "json",
  success : function(data){
    dohvatiEvropu(data);
  },
  error : function(xhr, status, error){
    console.log(error);
  }
});

$.ajax({
  url : "putovanja.json",
  type : "GET",
  dataType : "json",
  success : function(data){
    dohvatiOstatak(data);
  },
  error : function(xhr, status, error){
    console.log(error);
  }
});

slajder();

document.getElementById("tbIme").addEventListener("blur", proveriIme);
document.getElementById("tbIme").classList.add("cssBorder");
document.getElementById("tbEmail").addEventListener("blur", proveriEmail);
document.getElementById("tbEmail").classList.add("cssBorder");
document.getElementById("poruka").addEventListener("blur", proveriPoruku);
document.getElementById("poruka").classList.add("cssBorder");
document.getElementById("posalji").addEventListener("click", proveriFormular);

$('#spustanje').on('click', function(e){
  var x = $('#spustanje');
  $('html, body').stop().animate({
    scrollTop: $(x.attr('href')).offset().top
  }, 1000);
  e.preventDefault();
});

$('#ddlSortiraj').on('change', sortiraj);
$('#ddlSortiraj2').on('change', sortiraj2);
$('#ddlSortiraj3').on('change', sortiraj3);

var ddLista = $('#ddlSortiraj');
dohvatiListu(ddLista);

var ddLista2 = $('#ddlSortiraj2');
dohvatiListu2(ddLista2);

var ddLista3 = $('#ddlSortiraj3');
dohvatiListu3(ddLista3);

$('#btnPretraga').on('click', function(){
  var unos = $('#tbPretraga').val();
  var svaPutovanja = $('.putovanja');
  $.each(svaPutovanja, function(indeks, jednoPutovanje){
    imePutovanja = $(jednoPutovanje).attr("ime");
    if(unos == ""){
      $(jednoPutovanje).show();
    } else {
      if(imePutovanja.toLowerCase().indexOf(unos.toLowerCase()) !== -1){
        $(jednoPutovanje).show();
      } else {
        $(jednoPutovanje).hide();
      }
    }
  });
});

var slajderStr = '[{"src" : "slajder2", "alt" : "priroda"},{"src" : "slajder3", "alt" : "vodopad"},{"src" : "slajder4", "alt" : "surfer"},{"src" : "slajder5", "alt" : "putnički kombi"}]';
var slajderObj = JSON.parse(slajderStr);
var slajderIspis = '';
for(let i=0; i<slajderObj.length; i++){
  slajderIspis += '<img src="images/'+ slajderObj[i].src +'.jpeg" alt="Putovanje - '+ slajderObj[i].alt +'"/>';
}
$('#slajder').append(slajderIspis);

var galerijaStr = '[{"href" : "london1"}, {"href" : "havana1"}, {"href" : "amsterdam1"}, {"href" : "atina1"}, {"href" : "berlin1"}, {"href" : "bangkok1"}, {"href" : "buenos-ajres1"}, {"href" : "pariz1"}, {"href" : "rim1"}, {"href" : "manila1"}, {"href" : "lisabon1"}, {"href" : "tokio1"}, {"href" : "kairo1"}, {"href" : "monte-karlo1"}]';
var galerijaObj = JSON.parse(galerijaStr);
var galerijaIspis = '';
for(let i=0; i<galerijaObj.length; i++){
  galerijaIspis += '<a class="album sakriven" href="images/'+ galerijaObj[i].href +'.jpg"></a>';
}
$('#slike').append(galerijaIspis);

$('.album').simpleLightbox();

setInterval(function(){
  efekatGalerije();
}, 1500);

});


function dohvatiAjaxom(data){
  var ispis = '';
  for(let i=0; i<data.length; i++){
    ispis += '<div class="putovanja" ime="' +
    data[i].ime + '" cena="' +
    data[i].cena + '"><a href="images/' +
    data[i].slika +'1.jpg" target="_blank"><img src="images/' +
    data[i].slika + '.jpg" alt="' +
    data[i].alt + '"></a><div class="opis"><p>' +
    data[i].ime + '</p><div class="vise"><span>Cena: ' +
    data[i].cena + 'e</span></div></div></div>';
  }
  $('#sadrzaj-p').append(ispis);

}

function dohvatiEvropu(data){
  var ispis = '';
  for(let i=0; i<data.length; i++){
    if(data[i].id == 1)
    ispis += '<div class="putovanja" ime="' +
    data[i].ime + '" cena="' +
    data[i].cena + '"><a href="images/' +
    data[i].slika +'1.jpg" target="_blank"><img src="images/' +
    data[i].slika + '.jpg" alt="' +
    data[i].alt + '"></a><div class="opis"><p>' +
    data[i].ime + '</p><div class="vise"><span>Cena: ' +
    data[i].cena + 'e</span></div></div></div>';
  }
  $('#sadrzaj-e').append(ispis);
}

function dohvatiOstatak(data){
  var ispis = '';
  for(let i=0; i<data.length; i++){
    if(data[i].id == 2)
    ispis += '<div class="putovanja" ime="' +
    data[i].ime + '" cena="' +
    data[i].cena + '"><a href="images/' +
    data[i].slika +'1.jpg" target="_blank"><img src="images/' +
    data[i].slika + '.jpg" alt="' +
    data[i].alt + '"></a><div class="opis"><p>' +
    data[i].ime + '</p><div class="vise"><span>Cena: ' +
    data[i].cena + 'e</span></div></div></div>';
  }
  $('#sadrzaj-o-s').append(ispis);
}

function slajder(){
  var trenutna = $('.trenutna');
  var sledeca = trenutna.next().length ? trenutna.next() : trenutna.parent().children(':first');
  trenutna.hide().removeClass('trenutna');
  sledeca.fadeIn('slow').addClass('trenutna');
  setTimeout(slajder, 4000);
}

var reIme = /^[A-ZŠĐČĆŽ][a-zšđčćž]{2,11}(\s[A-ZŠĐČĆŽ][a-zšđčćž]{2,11})+$/;
var reEmail = /^[\w]+[\.\w\d]*\@[\w]+([\.][\w]+)+$/;
var rePoruka = /^[\w\W\d\D\s\S\b\B\n\r\t]{15,}$/;
function proveriIme(){
  var ime = document.getElementById("tbIme").value;
  if(!reIme.test(ime)){
    document.getElementById("tbIme").classList.add("nijeDobro");
  } else {
    document.getElementById("tbIme").classList.remove("nijeDobro");
  }
}
function proveriEmail(){
  var email = document.getElementById("tbEmail").value;
  if(!reEmail.test(email)){
    document.getElementById("tbEmail").classList.add("nijeDobro");
  } else {
    document.getElementById("tbEmail").classList.remove("nijeDobro");
  }
}
function proveriPoruku(){
  var poruka = document.getElementById("poruka").value;
  if(!rePoruka.test(poruka)){
    document.getElementById("poruka").classList.add("nijeDobro");
  } else {
    document.getElementById("poruka").classList.remove("nijeDobro");
  }
}

function proveriFormular(){

  var pol = document.getElementsByName('pol');
  var postojiCekiran = false;
  for(let i=0; i<pol.length; i++){
    if(pol[i].checked)
      break;
    else postojiCekiran = true;
  }

  var ime = document.getElementById("tbIme").value;
  var email = document.getElementById("tbEmail").value;
  var poruka = document.getElementById("poruka").value;
  var nizGresaka = [];
  if($('.nijeDobro').length || (ime == "") || (email == "") || (poruka == "")){
    if(!reIme.test(ime))
      nizGresaka.push("Ime i prezime nisu u dobrom formatu");
    if(!reEmail.test(email))
      nizGresaka.push("Email nije u dobrom formatu");
    if(!rePoruka.test(poruka))
      nizGresaka.push("Poruka mora da sadrži najmanje 15 karaktera");
    if(postojiCekiran)
      nizGresaka.push("Morate odabrati pol");
    ispisiGreske(nizGresaka);
    obeleziPrazno(ime, email, poruka);
  } else {
    alert("Poruka uspešno poslata");
    $('#greske').html('');
  }
}

function ispisiGreske(nizGresaka){
  var ispis = "<ul>";
  for(let i=0; i<nizGresaka.length; i++){
    ispis += "<li>"+ nizGresaka[i] +"</li>";
  }
  ispis += "</ul>";
  $('#greske').html(ispis);
}

function obeleziPrazno(ime, email, poruka){
  if(ime == "")
    document.getElementById("tbIme").classList.add("nijeDobro")
  if(email == "")
    document.getElementById("tbEmail").classList.add("nijeDobro")
  if(poruka == "")
    document.getElementById("poruka").classList.add("nijeDobro")
}

var objektiStr = '[{"ime" : "Lisabon","slika" : "lisabon","cena" : 700,"alt" : "Lisabon","id" : 1},{"ime" : "Amsterdam","slika" : "amsterdam","cena" : 350,"alt" : "Amsterdam","id" : 1},{"ime" : "Havana","slika" : "havana","cena" : 1100,"alt" : "Havana","id" : 2},{"ime" : "Pariz","slika" : "pariz","cena" : 600,"alt" : "Pariz","id" : 1}]';
var objekti = JSON.parse(objektiStr);
var ispisObjekata = '';
for(let i=0; i<objekti.length; i++){
  ispisObjekata += '<div class="putovanja"><a href="images/' +
  objekti[i].slika + '1.jpg" target="_blank"><img src="images/' +
  objekti[i].slika + '.jpg" alt="' +
  objekti[i].alt + '"></a><div class="opis"><p>' +
  objekti[i].ime + '</p><div class="vise"><span>Cena: ' +
  objekti[i].cena + 'e</span></div></div></div>';
}
$('#objekti').append(ispisObjekata);

function sortiraj(){
  var indeks = $('#ddlSortiraj').val();
  if(indeks == "0")
    return;
  if(indeks == "1"){
    sortCenaR();
  }
  if(indeks == "2"){
    sortCenaO();
  }
  if(indeks == "3"){
    sortNazivAZ();
  }
  if(indeks == "4"){
    sortNazivZA();
  }

}

function sortCenaR(){
  var x = $('.putovanja');
  x.sort(function(p1, p2){
    p1 = parseInt($(p1).attr("cena"), 10);
    p2 = parseInt($(p2).attr("cena"), 10);
  if(p1 > p2){
    return 1;
  } else if(p1 < p2){
    return -1;
  } else {
    return 0;
  }
  });
  $('#sadrzaj-p').append(x);
}

function sortCenaO(){
  var x = $('.putovanja');
  x.sort(function(p1, p2){
    p1 = parseInt($(p1).attr("cena"), 10);
    p2 = parseInt($(p2).attr("cena"), 10);
  if(p1 > p2){
    return -1;
  } else if(p1 < p2){
    return 1;
  } else {
    return 0;
  }
  });
  $('#sadrzaj-p').append(x);
}

function sortNazivAZ(){
  var x = $('.putovanja');
  x.sort(function(p1, p2){
    p1 = $(p1).attr("ime");
    p2 = $(p2).attr("ime");
  if(p1 > p2){
    return 1;
  } else if(p1 < p2){
    return -1;
  } else {
    return 0;
  }
  });
  $('#sadrzaj-p').append(x);
}

function sortNazivZA(){
  var x = $('.putovanja');
  x.sort(function(p1, p2){
    p1 = $(p1).attr("ime");
    p2 = $(p2).attr("ime");
  if(p1 > p2){
    return -1;
  } else if(p1 < p2){
    return 1;
  } else {
    return 0;
  }
  });
  $('#sadrzaj-p').append(x);
}

function sortiraj2(){
  var indeks = $('#ddlSortiraj2').val();
  if(indeks == "0")
    return;
  if(indeks == "1"){
    sortCenaR2();
  }
  if(indeks == "2"){
    sortCenaO2();
  }
  if(indeks == "3"){
    sortNazivAZ2();
  }
  if(indeks == "4"){
    sortNazivZA2();
  }

}

function sortCenaR2(){
  var x = $('.putovanja');
  x.sort(function(p1, p2){
    p1 = parseInt($(p1).attr("cena"), 10);
    p2 = parseInt($(p2).attr("cena"), 10);
  if(p1 > p2){
    return 1;
  } else if(p1 < p2){
    return -1;
  } else {
    return 0;
  }
  });
  $('#sadrzaj-e').append(x);
}

function sortCenaO2(){
  var x = $('.putovanja');
  x.sort(function(p1, p2){
    p1 = parseInt($(p1).attr("cena"), 10);
    p2 = parseInt($(p2).attr("cena"), 10);
  if(p1 > p2){
    return -1;
  } else if(p1 < p2){
    return 1;
  } else {
    return 0;
  }
  });
  $('#sadrzaj-e').append(x);
}

function sortNazivAZ2(){
  var x = $('.putovanja');
  x.sort(function(p1, p2){
    p1 = $(p1).attr("ime");
    p2 = $(p2).attr("ime");
  if(p1 > p2){
    return 1;
  } else if(p1 < p2){
    return -1;
  } else {
    return 0;
  }
  });
  $('#sadrzaj-e').append(x);
}

function sortNazivZA2(){
  var x = $('.putovanja');
  x.sort(function(p1, p2){
    p1 = $(p1).attr("ime");
    p2 = $(p2).attr("ime");
  if(p1 > p2){
    return -1;
  } else if(p1 < p2){
    return 1;
  } else {
    return 0;
  }
  });
  $('#sadrzaj-e').append(x);
}

function sortiraj3(){
  var indeks = $('#ddlSortiraj3').val();
  if(indeks == "0")
    return;
  if(indeks == "1"){
    sortCenaR3();
  }
  if(indeks == "2"){
    sortCenaO3();
  }
  if(indeks == "3"){
    sortNazivAZ3();
  }
  if(indeks == "4"){
    sortNazivZA3();
  }

}

function sortCenaR3(){
  var x = $('.putovanja');
  x.sort(function(p1, p2){
    p1 = parseInt($(p1).attr("cena"), 10);
    p2 = parseInt($(p2).attr("cena"), 10);
  if(p1 > p2){
    return 1;
  } else if(p1 < p2){
    return -1;
  } else {
    return 0;
  }
  });
  $('#sadrzaj-o-s').append(x);
}

function sortCenaO3(){
  var x = $('.putovanja');
  x.sort(function(p1, p2){
    p1 = parseInt($(p1).attr("cena"), 10);
    p2 = parseInt($(p2).attr("cena"), 10);
  if(p1 > p2){
    return -1;
  } else if(p1 < p2){
    return 1;
  } else {
    return 0;
  }
  });
  $('#sadrzaj-o-s').append(x);
}

function sortNazivAZ3(){
  var x = $('.putovanja');
  x.sort(function(p1, p2){
    p1 = $(p1).attr("ime");
    p2 = $(p2).attr("ime");
  if(p1 > p2){
    return 1;
  } else if(p1 < p2){
    return -1;
  } else {
    return 0;
  }
  });
  $('#sadrzaj-o-s').append(x);
}

function sortNazivZA3(){
  var x = $('.putovanja');
  x.sort(function(p1, p2){
    p1 = $(p1).attr("ime");
    p2 = $(p2).attr("ime");
  if(p1 > p2){
    return -1;
  } else if(p1 < p2){
    return 1;
  } else {
    return 0;
  }
  });
  $('#sadrzaj-o-s').append(x);
}

function dohvatiListu(ddLista){
  $.ajax({
    url : "ddLista.json",
    type : "GET",
    dataType : "json",
    success : function(data){
      popuniListu(data, ddLista);
    },
    error : function(xhr, status, error){
      console.log(error);
    }
  });
}

function popuniListu(data, ddLista){
  for(let i=0; i<data.length; i++){
    var ispis = "<option value='"+ data[i].value +"'>"+ data[i].tekst +"</option>";
    $('#ddlSortiraj').append(ispis);
  }
}


function dohvatiListu2(ddLista2){
  $.ajax({
    url : "ddLista.json",
    type : "GET",
    dataType : "json",
    success : function(data){
      popuniListu2(data, ddLista2);
    },
    error : function(xhr, status, error){
      console.log(error);
    }
  });
}

function popuniListu2(data, ddLista2){
  for(let i=0; i<data.length; i++){
    var ispis = "<option value='"+ data[i].value +"'>"+ data[i].tekst +"</option>";
    $('#ddlSortiraj2').append(ispis);
  }
}

function dohvatiListu3(ddLista3){
  $.ajax({
    url : "ddLista.json",
    type : "GET",
    dataType : "json",
    success : function(data){
      popuniListu3(data, ddLista3);
    },
    error : function(xhr, status, error){
      console.log(error);
    }
  });
}

function popuniListu3(data, ddLista3){
  for(let i=0; i<data.length; i++){
    var ispis = "<option value='"+ data[i].value +"'>"+ data[i].tekst +"</option>";
    $('#ddlSortiraj3').append(ispis);
  }
}

function efekatGalerije(){
  $('#album-s').fadeTo(750, 0.5).fadeTo(750, 1.0);
}
