document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var formularioEvento = document.getElementById('formularioEvento');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: [
      {
        title: 'Día del trabajo',
        start: '2024-05-01',
        end: '2024-05-01'
      },
      {
        title: 'Batalla de Puebla',
        start: '2024-05-05',
        end: '2024-05-05'
      },
      {
              title: 'Último día de clases',
              start: '2024-05-11',
              end: '2024-05-11'
      }


    ]
  });

  calendar.render();



//EN caso de querer agregar la opcion de un formulario para agregar nuevos eventos.
  formularioEvento.addEventListener('submit', function(event) {
    event.preventDefault();

    var tituloEvento = document.getElementById('tituloEvento').value;
    var fechaInicioEvento = document.getElementById('fechaInicioEvento').value;
    var fechaFinEvento = document.getElementById('fechaFinEvento').value;

    if (tituloEvento && fechaInicioEvento && fechaFinEvento) {
      var nuevoEvento = {
        title: tituloEvento,
        start: fechaInicioEvento,
        end: fechaFinEvento
      };

      calendar.addEvent(nuevoEvento);
      formularioEvento.reset(); // Resetea el formulario después de agregar el evento
    } else {
      alert('Por favor, completa todos los campos del formulario.');
    }
  });
  //form en el html
//  <form id="formularioEvento">
//      <input type="text" id="tituloEvento" placeholder="Título del evento" required>
//      <input type="text" id="fechaInicioEvento" placeholder="Fecha de inicio (YYYY-MM-DD)" required>
//      <input type="text" id="fechaFinEvento" placeholder="Fecha de fin (YYYY-MM-DD)" required>
//      <button type="submit">Agregar Evento</button>
//  </form>
});
