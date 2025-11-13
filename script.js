
const database = {
    patients: [
        { id: 1, name: "Maria Silva", age: 35, phone: "(11) 98765-4321", email: "maria@email.com", address: "Rua A, 123", cpf: "123.456.789-01", birthdate: "1989-05-15", lastVisit: "2023-10-15", status: "active" },
        { id: 2, name: "João Santos", age: 42, phone: "(11) 97654-3210", email: "joao@email.com", address: "Rua B, 456", cpf: "987.654.321-09", birthdate: "1982-03-20", lastVisit: "2023-10-10", status: "active" },
        { id: 3, name: "Ana Oliveira", age: 28, phone: "(11) 96543-2109", email: "ana@email.com", address: "Rua C, 789", cpf: "456.789.123-45", birthdate: "1996-08-10", lastVisit: "2023-10-05", status: "active" },
        { id: 4, name: "Carlos Ferreira", age: 55, phone: "(11) 95432-1098", email: "carlos@email.com", address: "Rua D, 321", cpf: "789.123.456-78", birthdate: "1968-12-05", lastVisit: "2023-09-20", status: "inactive" },
        { id: 5, name: "Fernanda Costa", age: 31, phone: "(11) 94321-0987", email: "fernanda@email.com", address: "Rua E, 654", cpf: "321.987.654-32", birthdate: "1992-07-14", lastVisit: "2023-10-08", status: "active" },
        { id: 6, name: "Roberto Alves", age: 48, phone: "(11) 93210-9876", email: "roberto@email.com", address: "Rua F, 987", cpf: "654.321.987-65", birthdate: "1975-11-25", lastVisit: "2023-08-30", status: "inactive" },
        { id: 7, name: "Juliana Pereira", age: 26, phone: "(11) 92109-8765", email: "juliana@email.com", address: "Rua G, 159", cpf: "159.753.852-14", birthdate: "1998-02-18", lastVisit: "2023-10-12", status: "active" },
        { id: 8, name: "Lucas Martins", age: 37, phone: "(11) 91098-7654", email: "lucas@email.com", address: "Rua H, 753", cpf: "753.159.456-87", birthdate: "1986-09-03", lastVisit: "2023-07-15", status: "inactive" }
    ],
    exams: [
        { id: 1, patientId: 1, type: "raio-x", date: "2023-10-15", doctorId: 1, status: "completed" },
        { id: 2, patientId: 2, type: "limpeza", date: "2023-10-10", doctorId: 2, status: "completed" },
        { id: 3, patientId: 3, type: "consulta", date: "2023-10-05", doctorId: 3, status: "pending" }
    ],
    doctors: [
        { id: 1, name: "Dr. Carlos Almeida", specialty: "ortodontia", phone: "(11) 91234-5678", email: "carlos@odontoplus.com", crm: "12345-SP", status: "active" },
        { id: 2, name: "Dra. Fernanda Lima", specialty: "endodontia", phone: "(11) 92345-6789", email: "fernanda@odontoplus.com", crm: "23456-SP", status: "active" },
        { id: 3, name: "Dr. Roberto Santos", specialty: "implantodontia", phone: "(11) 93456-7890", email: "roberto@odontoplus.com", crm: "34567-SP", status: "active" }
    ]
};

let navLinks, pages, modals, modalCloses, tabs, tabContents;

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

function getStatusText(status) {
    const statusMap = {
        'active': 'Ativo',
        'inactive': 'Inativo',
        'pending': 'Pendente',
        'completed': 'Concluído',
        'cancelled': 'Cancelado',
        'vacation': 'Férias'
    };
    return statusMap[status] || status;
}

function getExamTypeText(type) {
    const typeMap = {
        'raio-x': 'Raio-X',
        'limpeza': 'Limpeza',
        'consulta': 'Consulta',
        'ortodontia': 'Ortodontia',
        'cirurgia': 'Cirurgia'
    };
    return typeMap[type] || type;
}

function getSpecialtyText(specialty) {
    const specialtyMap = {
        'ortodontia': 'Ortodontia',
        'endodontia': 'Endodontia',
        'periodontia': 'Periodontia',
        'implantodontia': 'Implantodontia',
        'dentistica': 'Dentística',
        'cirurgia': 'Cirurgia'
    };
    return specialtyMap[specialty] || specialty;
}


function openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.style.display = 'flex';
}

function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.style.display = 'none';
}

function loadPatients() {
    const tableBody = document.getElementById('patients-table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    database.patients.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${patient.name}</td>
                    <td>${patient.age}</td>
                    <td>${patient.phone}</td>
                    <td>${patient.email}</td>
                    <td>${formatDate(patient.lastVisit)}</td>
                    <td><span class="status-badge status-${patient.status}">${getStatusText(patient.status)}</span></td>
                    <td class="action-buttons">
                        <button class="action-btn" onclick="editPatient(${patient.id})"><i class="fas fa-edit"></i></button>
                        <button class="action-btn" onclick="deletePatient(${patient.id})"><i class="fas fa-trash"></i></button>
                    </td>
                `;
        tableBody.appendChild(row);
    });
}

function loadExams() {
    const tableBody = document.getElementById('exams-table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    database.exams.forEach(exam => {
        const patient = database.patients.find(p => p.id === exam.patientId);
        const doctor = database.doctors.find(d => d.id === exam.doctorId);

        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${patient ? patient.name : 'N/A'}</td>
                    <td>${getExamTypeText(exam.type)}</td>
                    <td>${formatDate(exam.date)}</td>
                    <td>${doctor ? doctor.name : 'N/A'}</td>
                    <td><span class="status-badge status-${exam.status}">${getStatusText(exam.status)}</span></td>
                    <td class="action-buttons">
                        <button class="action-btn"><i class="fas fa-eye"></i></button>
                        <button class="action-btn"><i class="fas fa-download"></i></button>
                        <button class="action-btn" onclick="deleteExam(${exam.id})"><i class="fas fa-trash"></i></button>
                    </td>
                `;
        tableBody.appendChild(row);
    });
}

function loadDoctors() {
    const tableBody = document.getElementById('doctors-table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    database.doctors.forEach(doctor => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${doctor.name}</td>
                    <td>${getSpecialtyText(doctor.specialty)}</td>
                    <td>${doctor.phone}</td>
                    <td>${doctor.email}</td>
                    <td>${doctor.crm}</td>
                    <td><span class="status-badge status-${doctor.status}">${getStatusText(doctor.status)}</span></td>
                    <td class="action-buttons">
                        <button class="action-btn" onclick="editDoctor(${doctor.id})"><i class="fas fa-edit"></i></button>
                        <button class="action-btn" onclick="deleteDoctor(${doctor.id})"><i class="fas fa-trash"></i></button>
                    </td>
                `;
        tableBody.appendChild(row);
    });
}


function editPatient(id) { alert(`Editando paciente com ID: ${id}`); }
function deletePatient(id) {
    if (confirm('Tem certeza que deseja excluir este paciente?')) {
        alert('Paciente excluído com sucesso!');
        loadPatients();
    }
}
function deleteExam(id) {
    if (confirm('Tem certeza que deseja excluir este exame?')) {
        alert('Exame excluído com sucesso!');
        loadExams();
    }
}
function editDoctor(id) { alert(`Editando doutor com ID: ${id}`); }
function deleteDoctor(id) {
    if (confirm('Tem certeza que deseja excluir este doutor?')) {
        alert('Doutor excluído com sucesso!');
        loadDoctors();
    }
}

function setupFormHandlers() {
    const savePatientBtn = document.getElementById('save-patient');
    const saveExamBtn = document.getElementById('save-exam');
    const saveDoctorBtn = document.getElementById('save-doctor');

    if (savePatientBtn) savePatientBtn.addEventListener('click', () => {
        alert('Paciente salvo com sucesso!');
        closeModal('patient-modal');
        loadPatients();
    });

    if (saveExamBtn) saveExamBtn.addEventListener('click', () => {
        alert('Exame salvo com sucesso!');
        closeModal('exam-modal');
        loadExams();
    });

    if (saveDoctorBtn) saveDoctorBtn.addEventListener('click', () => {
        alert('Doutor salvo com sucesso!');
        closeModal('doctor-modal');
        loadDoctors();
    });
}


function waitForChart(maxRetries = 30, interval = 100) {
    return new Promise((resolve, reject) => {
        let tries = 0;
        const t = setInterval(() => {
            if (typeof Chart !== 'undefined') {
                clearInterval(t);
                resolve(true);
            } else {
                tries++;
                if (tries >= maxRetries) {
                    clearInterval(t);
                    reject(new Error('Chart.js não carregado'));
                }
            }
        }, interval);
    });
}


function initCharts() {
    try {
        console.log('initCharts: checando canvases...');
        const patientsEl = document.getElementById('patientsChart');
        const examsEl = document.getElementById('examsChart');
        const appointmentsEl = document.getElementById('appointmentsChart');
        const statusEl = document.getElementById('statusChart');

        console.log('Canvas elements:', {
            patients: !!patientsEl,
            exams: !!examsEl,
            appointments: !!appointmentsEl,
            status: !!statusEl
        });

        if (patientsEl) {
            const ctx = patientsEl.getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [{
                        label: 'Novos Pacientes',
                        data: [12, 19, 15, 25, 22, 30],
                        borderColor: '#4682B4',
                        backgroundColor: 'rgba(70, 130, 180, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#4682B4',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: true, position: 'top' } },
                    scales: { y: { beginAtZero: true } }
                }
            });
        }

        if (examsEl) {
            const ctx = examsEl.getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Raio-X', 'Limpeza', 'Consulta', 'Ortodontia', 'Cirurgia'],
                    datasets: [{
                        data: [45, 35, 25, 20, 15],
                        backgroundColor: ['#4682B4', '#87CEEB', '#B0E0E6', '#1E90FF', '#6495ED'],
                        borderColor: '#fff',
                        borderWidth: 2
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
            });
        }

        if (appointmentsEl) {
            const ctx = appointmentsEl.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Dr. Carlos', 'Dra. Fernanda', 'Dr. Roberto', 'Dra. Juliana', 'Dr. Anderson'],
                    datasets: [{ label: 'Agendamentos', data: [12, 19, 8, 15, 10], backgroundColor: '#4682B4', borderColor: '#36618a', borderWidth: 1, borderRadius: 8 }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true, position: 'top' } }, scales: { y: { beginAtZero: true } } }
            });
        }

        if (statusEl) {
            const ctx = statusEl.getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Ativo', 'Inativo', 'Pendente'],
                    datasets: [{ data: [193, 35, 20], backgroundColor: ['#4CAF50', '#f44336', '#FFC107'], borderColor: '#fff', borderWidth: 2 }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
            });
        }
    } catch (err) {
        console.error('Erro ao inicializar gráficos:', err);
    }
}

function setupReportModal() {
    const reportBtn = document.getElementById('generate-report-btn');
    const reportModal = document.getElementById('report-modal');
    const closeBtn = reportModal?.querySelector('.modal-close');
    const cancelBtn = document.getElementById('cancel-report');
    const confirmBtn = document.getElementById('confirm-report');
    const reportPeriod = document.getElementById('report-period');
    const customDates = document.getElementById('custom-dates');

    if (reportBtn) {
        reportBtn.addEventListener('click', () => {
            if (reportModal) reportModal.style.display = 'flex';
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', () => { if (reportModal) reportModal.style.display = 'none'; });
    if (cancelBtn) cancelBtn.addEventListener('click', () => { if (reportModal) reportModal.style.display = 'none'; });

    if (reportPeriod) {
        reportPeriod.addEventListener('change', (e) => {
            if (e.target.value === 'custom') {
                if (customDates) customDates.style.display = 'grid';
            } else {
                if (customDates) customDates.style.display = 'none';
            }
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            const type = document.getElementById('report-type')?.value;
            const period = document.getElementById('report-period')?.value;
            const format = document.getElementById('report-format')?.value;

            if (type && period) {
                alert(`Gerando relatório de ${type} para ${period} em formato ${format}...`);
                if (reportModal) reportModal.style.display = 'none';
            } else {
                alert('Por favor, preencha todos os campos obrigatórios!');
            }
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === reportModal) {
            if (reportModal) reportModal.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    navLinks = document.querySelectorAll('.nav-link');
    pages = document.querySelectorAll('.page');
    modals = document.querySelectorAll('.modal');
    modalCloses = document.querySelectorAll('.modal-close');
    tabs = document.querySelectorAll('.tab');
    tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            tabContents.forEach(content => content.classList.remove('active'));
            const el = document.getElementById(tabId);
            if (el) el.classList.add('active');
        });
    });

    const addPatientBtn = document.getElementById('add-patient-btn');
    const newPatientBtn = document.getElementById('new-patient-btn');
    const addExamBtn = document.getElementById('add-exam-btn');
    const newExamBtn = document.getElementById('new-exam-btn');
    const newDoctorBtn = document.getElementById('new-doctor-btn');

    if (addPatientBtn) addPatientBtn.addEventListener('click', () => openModal('patient-modal'));
    if (newPatientBtn) newPatientBtn.addEventListener('click', () => openModal('patient-modal'));
    if (addExamBtn) addExamBtn.addEventListener('click', () => openModal('exam-modal'));
    if (newExamBtn) newExamBtn.addEventListener('click', () => openModal('exam-modal'));
    if (newDoctorBtn) newDoctorBtn.addEventListener('click', () => openModal('doctor-modal'));

    modalCloses.forEach(close => {
        close.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) closeModal(modal.id);
        });
    });

    document.getElementById('cancel-patient')?.addEventListener('click', () => closeModal('patient-modal'));
    document.getElementById('cancel-exam')?.addEventListener('click', () => closeModal('exam-modal'));
    document.getElementById('cancel-doctor')?.addEventListener('click', () => closeModal('doctor-modal'));

    window.addEventListener('click', (e) => {
        if (e.target.classList && e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });

    loadPatients();
    loadExams();
    loadDoctors();

    const patientSelect = document.getElementById('exam-patient');
    if (patientSelect) {
        database.patients.forEach(patient => {
            const option = document.createElement('option');
            option.value = patient.id;
            option.textContent = patient.name;
            patientSelect.appendChild(option);
        });
    }

    const doctorSelect = document.getElementById('exam-doctor');
    if (doctorSelect) {
        database.doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = doctor.name;
            doctorSelect.appendChild(option);
        });
    }

    setupFormHandlers();
    setupReportModal();

    try {
        await waitForChart();
        initCharts();
    } catch (err) {
        console.error('Chart initialization skipped:', err);
    }
});

if (typeof database !== 'undefined' && !database.appointments) {
    database.appointments = [
        { id: 1, patientId: 1, doctorId: 1, date: "2025-11-20", time: "09:00", type: "consulta", status: "confirmed" },
        { id: 2, patientId: 2, doctorId: 2, date: "2025-11-20", time: "10:30", type: "limpeza", status: "pending" },
        { id: 3, patientId: 3, doctorId: 3, date: "2025-11-21", time: "14:00", type: "raio-x", status: "cancelled" }
    ];
}

function loadAppointments() {
    const tableBody = document.getElementById('appointments-table-body');
    if (!tableBody || !database.appointments) return;
    tableBody.innerHTML = '';

    database.appointments.forEach(app => {
        const patient = database.patients.find(p => p.id === app.patientId);
        const doctor = database.doctors.find(d => d.id === app.doctorId);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient ? patient.name : 'N/A'}</td>
            <td>${doctor ? doctor.name : 'N/A'}</td>
            <td>${formatDate(app.date)}</td>
            <td>${app.time}</td>
            <td>${getExamTypeText(app.type)}</td>
            <td><span class="status-badge status-${app.status}">${app.status === 'confirmed' ? 'Confirmado' : (app.status === 'pending' ? 'Pendente' : 'Cancelado')}</span></td>
            <td class="action-buttons">
                <button class="action-btn" onclick="editAppointment(${app.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn" onclick="deleteAppointment(${app.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editAppointment(id) { alert(`Editar agendamento ${id}`); }
function deleteAppointment(id) {
    if (!confirm('Tem certeza que deseja excluir este agendamento?')) return;
    const idx = database.appointments.findIndex(a => a.id === id);
    if (idx !== -1) database.appointments.splice(idx, 1);
    loadAppointments();
    if (window.calendar) {
        const ev = window.calendar.getEventById(String(id));
        if (ev) ev.remove();
    }
}

function initCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;

    const events = (database.appointments || []).map(a => {
        const patient = database.patients.find(p => p.id === a.patientId);
        const doctor = database.doctors.find(d => d.id === a.doctorId);

        let bgColor = '#6c757d'; 
        let borderColor = '#495057';

        if (a.status === 'confirmed') {
            bgColor = '#4CAF50'; 
            borderColor = '#388E3C';
        } else if (a.status === 'pending') {
            bgColor = '#FFC107'; 
            borderColor = '#FFA000';
        } else if (a.status === 'cancelled') {
            bgColor = '#f44336'; 
            borderColor = '#D32F2F';
        }

        return {
            id: String(a.id),
            title: `${patient ? patient.name : 'Paciente'} — ${doctor ? doctor.name : 'Doutor'}`,
            start: `${a.date}T${a.time}`,
            backgroundColor: bgColor,
            borderColor: borderColor,
            textColor: '#fff',
            extendedProps: {
                type: a.type,
                status: a.status,
                patientName: patient ? patient.name : 'N/A',
                doctorName: doctor ? doctor.name : 'N/A'
            }
        };
    });

    const CalendarClass = (window.FullCalendar && window.FullCalendar.Calendar) || (window.FullCalendar);
    if (!CalendarClass || typeof CalendarClass !== 'function') {
        console.warn('FullCalendar não disponível.');
        return;
    }

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pt-br', 
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        navLinks: true,
        selectable: true,
        events,
        eventClick(info) {
            const ev = info.event;
            const status = ev.extendedProps?.status || '';
            const statusText = status === 'confirmed' ? 'Confirmado' :
                (status === 'pending' ? 'Pendente' : 'Cancelado');
            const typeText = getExamTypeText(ev.extendedProps?.type || '');

            alert(`📅 AGENDAMENTO\n\nPaciente: ${ev.extendedProps?.patientName}\nDoutor: ${ev.extendedProps?.doctorName}\nData: ${ev.start.toLocaleDateString('pt-BR')}\nHora: ${ev.start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\nTipo: ${typeText}\nStatus: ${statusText}`);
        },
        dateClick(info) {
          
            openModal('appointment-modal');
            const dateInput = document.getElementById('appointment-date');
            if (dateInput) dateInput.value = info.dateStr;
        },
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
            hour12: false
        },
     
        buttonText: {
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
            list: 'Lista'
        }
    });

    calendar.render();
    window.calendar = calendar;
}

async function waitForFullCalendar(maxTries = 30, interval = 100) {
    let tries = 0;
    while (tries < maxTries) {
        if (window.FullCalendar || typeof FullCalendar !== 'undefined') return true;
        await new Promise(r => setTimeout(r, interval));
        tries++;
    }
    throw new Error('FullCalendar não carregado');
}


document.addEventListener('DOMContentLoaded', async () => {

    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return; 

   
    const patientSelect = document.getElementById('appointment-patient');
    if (patientSelect) {
        patientSelect.innerHTML = '<option value="">Selecione um paciente</option>';
        database.patients.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.name;
            patientSelect.appendChild(opt);
        });
    }

    const doctorSelect = document.getElementById('appointment-doctor');
    if (doctorSelect) {
        doctorSelect.innerHTML = '<option value="">Selecione um doutor</option>';
        database.doctors.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d.id;
            opt.textContent = d.name;
            doctorSelect.appendChild(opt);
        });
    }

  
    document.getElementById('add-appointment-btn')?.addEventListener('click', () => openModal('appointment-modal'));
    document.getElementById('cancel-appointment')?.addEventListener('click', () => closeModal('appointment-modal'));

    document.getElementById('save-appointment')?.addEventListener('click', (e) => {
        e.preventDefault();
        const patientId = Number(document.getElementById('appointment-patient')?.value || 0);
        const doctorId = Number(document.getElementById('appointment-doctor')?.value || 0);
        const date = document.getElementById('appointment-date')?.value;
        const time = document.getElementById('appointment-time')?.value;
        const type = document.getElementById('appointment-type')?.value;
        const status = document.getElementById('appointment-status')?.value;

        if (!patientId || !doctorId || !date || !time) {
            alert('Preencha paciente, doutor, data e hora.');
            return;
        }

        const newId = (database.appointments.reduce((m, a) => Math.max(m, a.id), 0) || 0) + 1;
        const newApp = { id: newId, patientId, doctorId, date, time, type, status };
        database.appointments.push(newApp);
        loadAppointments();

        if (window.calendar) {
            const patient = database.patients.find(p => p.id === patientId);
            const doctor = database.doctors.find(d => d.id === doctorId);

            let bgColor = '#6c757d';
            let borderColor = '#495057';

            if (status === 'confirmed') {
                bgColor = '#4CAF50';
                borderColor = '#388E3C';
            } else if (status === 'pending') {
                bgColor = '#FFC107';
                borderColor = '#FFA000';
            } else if (status === 'cancelled') {
                bgColor = '#f44336';
                borderColor = '#D32F2F';
            }

            window.calendar.addEvent({
                id: String(newId),
                title: `${patient ? patient.name : 'Paciente'} — ${doctor ? doctor.name : 'Doutor'}`,
                start: `${date}T${time}`,
                backgroundColor: bgColor,
                borderColor: borderColor,
                textColor: '#fff',
                extendedProps: {
                    type,
                    status,
                    patientName: patient ? patient.name : 'N/A',
                    doctorName: doctor ? doctor.name : 'N/A'
                }
            });
        }
        closeModal('appointment-modal');
        alert('✅ Agendamento salvo com sucesso!');
    });

 
    loadAppointments();


    try {
        await waitForFullCalendar();
        initCalendar();
    } catch (err) {
        console.warn('Calendário não inicializado:', err);
    }
}, { once: false });

database.payments = [
    { id: 1, patientId: 1, service: "consulta", amount: 150.00, date: "2025-11-15", method: "credit-card", status: "paid", notes: "Consulta de rotina" },
    { id: 2, patientId: 2, service: "limpeza", amount: 200.00, date: "2025-11-14", method: "cash", status: "paid", notes: "Limpeza profissional" },
    { id: 3, patientId: 3, service: "raio-x", amount: 120.00, date: "2025-11-13", method: "transfer", status: "paid", notes: "Raio-X panorâmico" },
    { id: 4, patientId: 1, service: "obturacao", amount: 350.00, date: "2025-11-12", method: "credit-card", status: "pending", notes: "Obturação temporária" },
    { id: 5, patientId: 2, service: "aparelho", amount: 800.00, date: "2025-11-11", method: "transfer", status: "paid", notes: "Colocação de aparelho" },
    { id: 6, patientId: 3, service: "clareamento", amount: 400.00, date: "2025-11-10", method: "credit-card", status: "paid", notes: "Clareamento dental" },
    { id: 7, patientId: 1, service: "extracao", amount: 280.00, date: "2025-11-09", method: "cash", status: "paid", notes: "Extração simples" },
    { id: 8, patientId: 2, service: "implante", amount: 2500.00, date: "2025-11-08", method: "transfer", status: "pending", notes: "Implante dentário" }
];


function loadPayments() {
    const tableBody = document.getElementById('payments-table-body');
    if (!tableBody || !database.payments) return;
    tableBody.innerHTML = '';

    database.payments.forEach(payment => {
        const patient = database.patients.find(p => p.id === payment.patientId);
        const row = document.createElement('tr');
        const serviceText = getServiceText(payment.service);
        const methodText = getPaymentMethodText(payment.method);

        row.innerHTML = `
            <td>${patient ? patient.name : 'N/A'}</td>
            <td>${serviceText}</td>
            <td>R$ ${payment.amount.toFixed(2).replace('.', ',')}</td>
            <td>${formatDate(payment.date)}</td>
            <td>
                <div class="payment-method-badge">
                    <i class="${getPaymentMethodIcon(payment.method)}"></i>
                    ${methodText}
                </div>
            </td>
            <td><span class="status-badge status-${payment.status}">${getPaymentStatusText(payment.status)}</span></td>
            <td class="action-buttons">
                <button class="action-btn" onclick="editPayment(${payment.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn" onclick="deletePayment(${payment.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });


    loadRecentTransactions();
}

function loadRecentTransactions() {
    const container = document.querySelector('.transactions-list');
    if (!container || !database.payments) return;
    container.innerHTML = '';

    const recent = database.payments.slice(-5).reverse();
    recent.forEach(payment => {
        const patient = database.patients.find(p => p.id === payment.patientId);
        const methodText = getPaymentMethodText(payment.method);

        const transaction = document.createElement('div');
        transaction.className = 'transaction-item';
        transaction.innerHTML = `
            <div class="transaction-info">
                <div class="transaction-patient">${patient ? patient.name : 'N/A'}</div>
                <div class="transaction-service">${getServiceText(payment.service)}</div>
                <div class="transaction-date">${formatDate(payment.date)}</div>
            </div>
            <div class="transaction-method">
                <i class="${getPaymentMethodIcon(payment.method)}"></i>
                ${methodText}
            </div>
            <div class="transaction-amount">R$ ${payment.amount.toFixed(2).replace('.', ',')}</div>
            <div class="transaction-status status-${payment.status}">
                ${getPaymentStatusText(payment.status)}
            </div>
        `;
        container.appendChild(transaction);
    });
}


function getServiceText(service) {
    const services = {
        'consulta': 'Consulta',
        'limpeza': 'Limpeza',
        'raio-x': 'Raio-X',
        'obturacao': 'Obturação',
        'extracao': 'Extração',
        'implante': 'Implante',
        'clareamento': 'Clareamento',
        'aparelho': 'Aparelho'
    };
    return services[service] || service;
}

function getPaymentMethodText(method) {
    const methods = {
        'credit-card': 'Cartão de Crédito',
        'debit-card': 'Cartão de Débito',
        'cash': 'Dinheiro',
        'transfer': 'Transferência',
        'check': 'Cheque'
    };
    return methods[method] || method;
}

function getPaymentMethodIcon(method) {
    const icons = {
        'credit-card': 'fas fa-credit-card',
        'debit-card': 'fas fa-credit-card',
        'cash': 'fas fa-money-bill',
        'transfer': 'fas fa-university',
        'check': 'fas fa-file-invoice'
    };
    return icons[method] || 'fas fa-credit-card';
}

function getPaymentStatusText(status) {
    const statusMap = {
        'paid': 'Pago',
        'pending': 'Pendente',
        'cancelled': 'Cancelado'
    };
    return statusMap[status] || status;
}

function editPayment(id) { alert(`Editar pagamento ${id}`); }
function deletePayment(id) {
    if (!confirm('Tem certeza que deseja excluir este pagamento?')) return;
    const idx = database.payments.findIndex(p => p.id === id);
    if (idx !== -1) database.payments.splice(idx, 1);
    loadPayments();
    alert('Pagamento excluído com sucesso!');
}


document.addEventListener('DOMContentLoaded', () => {
   
    const paymentPatientSelect = document.getElementById('payment-patient');
    if (paymentPatientSelect) {
        paymentPatientSelect.innerHTML = '<option value="">Selecione um paciente</option>';
        database.patients.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.name;
            paymentPatientSelect.appendChild(opt);
        });
    }

    document.getElementById('new-payment-btn')?.addEventListener('click', () => openModal('payment-modal'));
    document.getElementById('cancel-payment')?.addEventListener('click', () => closeModal('payment-modal'));

    document.getElementById('save-payment')?.addEventListener('click', (e) => {
        e.preventDefault();
        const patientId = Number(document.getElementById('payment-patient')?.value || 0);
        const service = document.getElementById('payment-service')?.value;
        const amount = parseFloat(document.getElementById('payment-amount')?.value || 0);
        const date = document.getElementById('payment-date')?.value;
        const method = document.getElementById('payment-method')?.value;
        const status = document.getElementById('payment-status')?.value;
        const notes = document.getElementById('payment-notes')?.value;

        if (!patientId || !service || !amount || !date || !method) {
            alert('Preencha todos os campos obrigatórios!');
            return;
        }

        const newId = (database.payments.reduce((m, p) => Math.max(m, p.id), 0) || 0) + 1;
        const newPayment = { id: newId, patientId, service, amount, date, method, status, notes };
        database.payments.push(newPayment);

        loadPayments();
        closeModal('payment-modal');
        alert('✅ Pagamento registrado com sucesso!');
    });

    loadPayments();
});

function loadPatients() {
    const tableBody = document.getElementById('patients-table-body');
    if (!tableBody || !database.patients) return;
    tableBody.innerHTML = '';

    database.patients.forEach(patient => {
        const row = document.createElement('tr');
        const age = calculateAge(patient.birthdate || patient.lastVisit);

        row.innerHTML = `
            <td>${patient.name}</td>
            <td>${age}</td>
            <td>${patient.phone}</td>
            <td>${patient.email}</td>
            <td>${formatDate(patient.lastVisit)}</td>
            <td><span class="status-badge status-${patient.status}">${getStatusText(patient.status)}</span></td>
            <td class="action-buttons">
                <button class="action-btn" onclick="editPatient(${patient.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn" onclick="deletePatient(${patient.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}


function filterPatientsByStatus(status) {
    const tableBody = document.getElementById('patients-table-body');
    if (!tableBody || !database.patients) return;
    tableBody.innerHTML = '';

    let filtered = database.patients;
    
    if (status === 'active') {
        filtered = database.patients.filter(p => p.status === 'active');
    } else if (status === 'inactive') {
        filtered = database.patients.filter(p => p.status === 'inactive');
    }

    if (filtered.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--gray);">Nenhum paciente encontrado</td></tr>';
        return;
    }

    filtered.forEach(patient => {
        const row = document.createElement('tr');
        const age = patient.age || 0;

        row.innerHTML = `
            <td>${patient.name}</td>
            <td>${age}</td>
            <td>${patient.phone}</td>
            <td>${patient.email}</td>
            <td>${formatDate(patient.lastVisit)}</td>
            <td><span class="status-badge status-${patient.status}">${getStatusText(patient.status)}</span></td>
            <td class="action-buttons">
                <button class="action-btn" onclick="editPatient(${patient.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn" onclick="deletePatient(${patient.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}


function editPatient(id) { alert(`Editar paciente ${id}`); }
function deletePatient(id) {
    if (!confirm('Tem certeza que deseja excluir este paciente?')) return;
    const idx = database.patients.findIndex(p => p.id === id);
    if (idx !== -1) database.patients.splice(idx, 1);
    loadPatients();
    alert('Paciente excluído com sucesso!');
}

function calculateAge(dateString) {
    if (!dateString) return 0;
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


document.addEventListener('DOMContentLoaded', () => {
   
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
        
            tabs.forEach(t => t.classList.remove('active'));
      
            this.classList.add('active');

            const tabId = this.getAttribute('data-tab');
            
            if (tabId === 'all-patients') {
                loadPatients();
            } else if (tabId === 'active-patients') {
                filterPatientsByStatus('active');
            } else if (tabId === 'inactive-patients') {
                filterPatientsByStatus('inactive');
            }
        });
    });

    document.getElementById('new-patient-btn')?.addEventListener('click', () => openModal('patient-modal'));
    document.getElementById('add-patient-btn')?.addEventListener('click', () => openModal('patient-modal'));
    document.getElementById('cancel-patient')?.addEventListener('click', () => closeModal('patient-modal'));

    document.getElementById('save-patient')?.addEventListener('click', (e) => {
        e.preventDefault();
        const name = document.getElementById('patient-name')?.value;
        const birthdate = document.getElementById('patient-birthdate')?.value;
        const phone = document.getElementById('patient-phone')?.value;
        const email = document.getElementById('patient-email')?.value;
        const address = document.getElementById('patient-address')?.value;
        const cpf = document.getElementById('patient-cpf')?.value;
        const status = document.getElementById('patient-status')?.value;
        const newPatient = {
            id: newId,
            name,
            age,
            phone,
            email,
            address,
            cpf,
            birthdate,
            lastVisit: new Date().toISOString().split('T')[0],
            status
        };
        database.patients.push(newPatient);

        loadPatients();
        closeModal('patient-modal');
        alert('✅ Paciente cadastrado com sucesso!');
    });

    loadPatients();
});