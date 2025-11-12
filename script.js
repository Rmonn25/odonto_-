// Database simulation
const database = {
    patients: [
        { id: 1, name: "Maria Silva", age: 35, phone: "(11) 98765-4321", email: "maria@email.com", lastVisit: "2023-10-15", status: "active" },
        { id: 2, name: "João Santos", age: 42, phone: "(11) 97654-3210", email: "joao@email.com", lastVisit: "2023-10-10", status: "active" },
        { id: 3, name: "Ana Oliveira", age: 28, phone: "(11) 96543-2109", email: "ana@email.com", lastVisit: "2023-10-05", status: "pending" }
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

// DOM Elements (will be used after DOM ready)
let navLinks, pages, modals, modalCloses, tabs, tabContents;

// Helper functions (kept as before)
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

// Modal helpers
function openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.style.display = 'flex';
}

function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.style.display = 'none';
}

// Load data functions
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
                    <td><span class="status-badge status-${doctor.status}">${getStatusText(doctor.status)}</span></td>
                    <td class="action-buttons">
                        <button class="action-btn" onclick="editDoctor(${doctor.id})"><i class="fas fa-edit"></i></button>
                        <button class="action-btn" onclick="deleteDoctor(${doctor.id})"><i class="fas fa-trash"></i></button>
                    </td>
                `;
        tableBody.appendChild(row);
    });
}

// CRUD operations (simulated)
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

// Form submission handlers
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

// Wait-for-Chart helper (retries)
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

// Initialize charts (safe)
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

        // Pacientes - Line
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

        // Exames - Doughnut
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

        // Agendamentos - Bar
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

        // Status - Pie
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

    // Fechar modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === reportModal) {
            if (reportModal) reportModal.style.display = 'none';
        }
    });
}

// Initialize the application after DOM ready and Chart.js available
document.addEventListener('DOMContentLoaded', async () => {
    // Cache DOM elements that require existence
    navLinks = document.querySelectorAll('.nav-link');
    pages = document.querySelectorAll('.page');
    modals = document.querySelectorAll('.modal');
    modalCloses = document.querySelectorAll('.modal-close');
    tabs = document.querySelectorAll('.tab');
    tabContents = document.querySelectorAll('.tab-content');

    // Tabs
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

    // Modal open/close buttons (guarded)
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

    // Load initial data
    loadPatients();
    loadExams();
    loadDoctors();

    // Populate dropdowns in modals
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

    // Wait for Chart.js then init charts
    try {
        await waitForChart();
        initCharts();
    } catch (err) {
        console.error('Chart initialization skipped:', err);
    }
});

// Se database existir sem appointments, adiciona lista de exemplo
if (typeof database !== 'undefined' && !database.appointments) {
    database.appointments = [
        { id: 1, patientId: 1, doctorId: 1, date: "2025-11-20", time: "09:00", type: "consulta", status: "confirmed" },
        { id: 2, patientId: 2, doctorId: 2, date: "2025-11-20", time: "10:30", type: "limpeza", status: "pending" },
        { id: 3, patientId: 3, doctorId: 3, date: "2025-11-21", time: "14:00", type: "raio-x", status: "cancelled" }
    ];
}

// Carrega agendamentos na tabela
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

// Inicializa FullCalendar com eventos
function initCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;

    // transforma appointments em eventos
    const events = (database.appointments || []).map(a => {
        const patient = database.patients.find(p => p.id === a.patientId);
        const doctor = database.doctors.find(d => d.id === a.doctorId);

        // Define cores baseado no status
        let bgColor = '#6c757d'; // padrão cinza
        let borderColor = '#495057';

        if (a.status === 'confirmed') {
            bgColor = '#4CAF50'; // verde
            borderColor = '#388E3C';
        } else if (a.status === 'pending') {
            bgColor = '#FFC107'; // amarelo
            borderColor = '#FFA000';
        } else if (a.status === 'cancelled') {
            bgColor = '#f44336'; // vermelho
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
        locale: 'pt-br', // Português Brasil
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
            // abre modal de novo agendamento preenchendo a data clicada
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
        // Botões e labels em português
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

// pequeno utilitário para aguardar FullCalendar
async function waitForFullCalendar(maxTries = 30, interval = 100) {
    let tries = 0;
    while (tries < maxTries) {
        if (window.FullCalendar || typeof FullCalendar !== 'undefined') return true;
        await new Promise(r => setTimeout(r, interval));
        tries++;
    }
    throw new Error('FullCalendar não carregado');
}

// inicialização específica do agendamento (adiciona listener extra)
document.addEventListener('DOMContentLoaded', async () => {
    // Verificar se estamos na página de agendamentos
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return; // Não inicializa se não estiver na página correta

    // popula selects do modal de agendamento
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

    // botões modal
    document.getElementById('add-appointment-btn')?.addEventListener('click', () => openModal('appointment-modal'));
    document.getElementById('cancel-appointment')?.addEventListener('click', () => closeModal('appointment-modal'));

    // salvar agendamento
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

    // carrega tabela
    loadAppointments();

    // aguarda FullCalendar e inicializa
    try {
        await waitForFullCalendar();
        initCalendar();
    } catch (err) {
        console.warn('Calendário não inicializado:', err);
    }
}, { once: false });