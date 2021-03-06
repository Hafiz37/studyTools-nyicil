import "../modulPraktikum.css";
import { useState, useEffect } from "react"
import { Accordion, Button } from 'react-bootstrap';


// --komponen Depan
import komponena from '../../../../src/komponen/modul-3D/samsung-galaxy-A5-2017/komponen/komponen-4-a.png';
// --komponen Belakang
import komponenb from '../../../../src/komponen/modul-3D/samsung-galaxy-A5-2017/komponen/komponen-4-b.png';
// --- hp adalah hp yg belum dirakit
import hpbelumdirakit from '../../../../src/komponen/modul-3D/samsung-galaxy-A5-2017/langkah-langkah/langkah-1.png';
// --- hppasang hp yg sudah dirakit
import hpsudahdirakit from '../../../../src/komponen/modul-3D/samsung-galaxy-A5-2017/langkah-langkah/langkah-2.png';

// --- list komponent
import komponen3 from '../../../../src/komponen/modul-3D/samsung-galaxy-A5-2017/komponen/komponen-3-a.png';
import komponen15 from '../../../../src/komponen/modul-3D/samsung-galaxy-A5-2017/komponen/komponen-15-a.png';
import komponen9 from '../../../../src/komponen/modul-3D/samsung-galaxy-A5-2017/komponen/komponen-9-a.png';
import komponen10 from '../../../../src/komponen/modul-3D/samsung-galaxy-A5-2017/komponen/komponen-10-a.png';

import React from 'react';
import MenuStep from "./MenuStep";
import interact from 'interactjs';
import $ from "jquery";
import Navbar from "../../../komponen/navbar/navbar";
import react from "react";

function ModelStep1() {
  let putar = 0;
  let balik = 1;
  let derajat = 0;
  let LokasiOK = 0;
  // var lokx = 0;
  // var loky = 0;

  let rotasi_sesuai = 90;
  let posisi_hadap = 2;
  let pasang = 0;

  function balikGambar(e) {
    e.preventDefault();
    if (balik === 1) {
      $("#gambarterpilih").attr("src", komponenb);
      balik = 2;
    } else {
      $("#gambarterpilih").attr("src", komponena);
      balik = 1;
    }
  }

  function putarGambar(e) {
    e.preventDefault();
    if (LokasiOK === 1) {
      if (putar >= 4) {
        putar = 1;
      } else {
        putar = putar + 1;
      }
      derajat = 90 * putar;
      $('#gambarterpilih').css({
        "transform": "rotate(" + derajat + "deg)"
      });
      // alert(derajat);
    } else {
      alert("belum Ada Ditempatnya");
    }
  }

  function tempel(e) {
    e.preventDefault();
    if (LokasiOK === 1 && derajat === rotasi_sesuai && balik === posisi_hadap) {
      $("#device").attr("src", casing_hp);
      $("#gambarterpilih").attr("hidden", "true");
      $(".btnSimpan").removeAttr("disabled");
      pasang = 1;
    } else {
      alert("Lokasi Komponen Tidak Sesuai");
    }
  }
  function selanjutnya(e) {
    e.preventDefault();
    console.log('Lokasi: ' + LokasiOK + ', derajat: ' + derajat + ', rotasi sesuai: ' + rotasi_sesuai + ', balik: ' + balik + ', posisi hadap: ' + posisi_hadap);
    if (pasang === 1) {
      window.location.replace("ModulA5step2");
    } else {
      alert("Komponen Belum Terpasang");
    }
  }

  function dragMoveListener(event) {
    var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.position = "relative";
    target.style.left = x + "px";
    target.style.top = y + "px";
    // $('.gambar').css({
    //   "position" : "absolute",
    //   "left" : x+"px", /* For modern browsers(CSS3)  */
    //   "top" : y+"px", /* For modern browsers(CSS3)  */
    // });
    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  /* The dragging code for '.draggable' from the demo above
  * applies to this demo as well so it doesn't have to be repeated. */

  // enable draggables to be dropped into this
  interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '.gambar',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,

    // listen for drop related events:

    ondropactivate: function (event) {
      // add active dropzone feedback
      event.target.classList.add('drop-active')
    },

    ondragenter: function (event) {
      // alert("lokasi pas");
      var draggableElement = event.relatedTarget
      var dropzoneElement = event.target
      // feedback the possibility of a drop
      if (draggableElement.getAttribute("status") === "terpilih") {
        draggableElement.classList.add('can-drop')
        LokasiOK = 1
      } else {
        draggableElement.classList.add('no-drop')
      }
      dropzoneElement.classList.add('drop-target')
    },

    ondragleave: function (event) {
      LokasiOK = 0;
      // remove the drop feedback style
      event.target.classList.remove('drop-target')
      event.relatedTarget.classList.remove('can-drop')
      event.relatedTarget.classList.remove('no-drop')
    },

    ondrop: function (event) {
      event.relatedTarget.textContent = 'Dropped'
    },

    ondropdeactivate: function (event) {
      // remove active dropzone feedback
      event.target.classList.remove('drop-active')
      event.target.classList.remove('drop-target')
    }
  })

  interact('.drag-drop')
    .draggable({
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: '.dnd-items',
          endOnly: true
        })
      ],
      autoScroll: true,
      // dragMoveListener from the dragging demo above
      listeners: {
        move: dragMoveListener,
      }
    })

  function handleClick(e) {
    e.preventDefault();
    alert('The link was clicked.');
  }

  // Ambil Materi dari server
  let [materi, setMateri] = useState()
  let [materiDipilih, setMateriDipilih] = useState()
  let [casing_hp, setCasing] = useState()
  let [komponen, setKomponen] = useState()

  function setMateriData(materi, daftar_materi) {
    setMateriDipilih(materi)
    setCasing(materi.casing_sebelum_terpasang)

    let id_sekarang = materi.id - 1;
    console.log(materiDipilih)
    const row_list = []
    for (id_sekarang; id_sekarang <= daftar_materi.length; id_sekarang++) {
      try{
        const komponen_sekarang = daftar_materi[id_sekarang].komponen_tampak_depan
        let row = (<img src={komponen_sekarang} className="macamKomponen gambar drag-drop" data-bs-toggle="tooltip"  data-bs-placement="top" />)
        if(materi.id == daftar_materi[id_sekarang].id){
           row = (
            <img src={komponen_sekarang} id="gambarterpilih" status="terpilih" className="macamKomponen gambar drag-drop" data-bs-toggle="tooltip"  data-bs-placement="top" />
          )
        }
        console.log(id_sekarang)
        row_list.push(row)
      }
      catch{}
    }
    setKomponen(row_list)
  }

  let api = () => {
    fetch("https://615eb2583d1491001755aa76.mockapi.io/materi")
      .then(respons => respons.json())
      .then((result) => {
        const row_item = []
        for (let item of result) {
          const row = (
            <Accordion.Item eventKey={item.id}>
              <Accordion.Header>
                <span class="fw-bold fs-5" type="button">
                  {item.judul}
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <div class="lh-base fs-6">
                  {item.deskripsi}<br />
                  <Button className="mt-2"
                    onClick={() => setMateriData(item, result)}>Mulai</Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          );
          row_item.push(row);
        }
        setMateri(row_item)
      })
  }

  useEffect(() => {
    api();
  }, []);

  return (
    <div>

      <Navbar />
      <section id="progresbarPraktek">
        <div className="container mb-3">
          <div className="row d-flex justify-content-center mt-3">
            <div className="col-lg-7">
              <div className="progress rounded-pill">
                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="3.7" aria-valuemin="0" aria-valuemax="100" style={{ width: "3.7%" }}>3.7%</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row praktek rounded-25 shadow border pe-0 pe-lg-2">
          <h1 className="fw-bold fs-1 mt-4 ms-1 mb-5 mt-4">Perakitan Samsung A5 2017</h1>
          <div className="d-flex flex-column flex-lg-row mb-4">
            <div className="col-lg-4 border border-dark rounded-25 bg-light me-0 me-lg-2 d-flex flex-column justify-content-between">
              <div>
                <h2 className="belajarYuk text-center fs-6 fw-bold d-flex justify-content-center align-items-center text-light">Belajar yuk</h2>
                <div class="accordion accordion-flush" id="accordionFlushExample" style={{ height: 650, "overflow-y": "auto" }}>
                  <Accordion defaultActiveKey="0">
                    {materi}
                  </Accordion>
                </div>
              </div>
              <div className="border-top border-2 border-dark my-2 pt-2 text-center">
                <button className="btn fw-bold w-50 rounded-pill text-white" style={{ background: '#7827E6' }} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Tombol kirim hanya bisa digunakan jika tantangan sudah selesai semua!">Kirim</button>
              </div>
            </div>
            <div className="col-lg-8 mt-3 mt-lg-0">
              <div className="border rounded-25 border-dark border-2 bg-light">
                <div className="dnd-items">
                  <div className="dropzone border rounded-25">
                    <img src={casing_hp} id="device" width="100%" />
                    {/* img diganti iframe */}
                  </div>
                  <div className="my-2 border-top border-bottom border-dark border-2 p-2 text-center">
                    {komponen}
                    <img src={komponen3} className="macamKomponen gambar drag-drop" data-bs-toggle="tooltip" data-bs-placement="top" title="button home-button back" />
                    <img src={komponena} className="macamKomponen gambar drag-drop" id="gambarterpilih" status="terpilih" data-bs-toggle="tooltip" data-bs-placement="top" title="fingerprin(sidik jari)" />
                    <img src={komponen15} className="macamKomponen gambar drag-drop" data-bs-toggle="tooltip" data-bs-placement="top" title="okta(layar)" />
                    <img src={komponen10} className="macamKomponen gambar drag-drop" data-bs-toggle="tooltip" data-bs-placement="top" title="main cam(kamera belakang)" />
                    <img src={komponen9} className="macamKomponen gambar drag-drop" data-bs-toggle="tooltip" data-bs-placement="top" title="front cam(kamera depan)" />
                  </div>
                </div>
                <div className="d-flex justify-content-evenly mb-2 btn-control">
                  <button className="btn btn-secondary rounded-pill" onClick={putarGambar}><i className="bi bi-arrow-clockwise"></i><span className="d-none d-md-block">&nbsp;Putar</span></button>
                  <button className="btn btn-warning rounded-pill" onClick={balikGambar}><i className="bi bi-arrow-repeat"></i><span className="d-none d-md-block">&nbsp;Balik</span></button>
                  <button className="btn btn-primary rounded-pill" onClick={tempel}><i className="bi bi-clipboard-check"></i><span className="d-none d-md-block">&nbsp;Tempel</span></button>
                  <button className="btn btn-success rounded-pill" onClick={selanjutnya}><i className="bi bi-save2"></i><span className="d-none d-md-block">&nbsp;Simpan</span></button>
                </div>
              </div>
              <div className="forum mt-2 row p-3 border border-dark border-2 rounded-25 mx-1">
                <p className="col-md-7 fs-5 mb-2 mb-md-0">Anda ingin menanyakan materi? Klik tombol Forum</p>
                <button className="col-md-5 btn btn-primary rounded-pill">Forum</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ModelStep1