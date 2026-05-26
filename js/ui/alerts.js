import Swal from 'sweetalert2';

/**
 * Exibe um alerta usando SweetAlert2
 * @param {string} title - Título do alerta
 * @param {string} text - Texto do alerta
 * @param {'success' | 'error' | 'warning' | 'info' | 'question'} icon - Ícone do alerta
 */
export function showAlert(title, text, icon = 'info') {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: '#a855f7', // Primary color
    background: document.documentElement.classList.contains('dark') ? '#1E293B' : '#FFFFFF',
    color: document.documentElement.classList.contains('dark') ? '#F8FAFC' : '#0F172A',
  });
}

/**
 * Exibe uma confirmação usando SweetAlert2
 * @param {string} title - Título da confirmação
 * @param {string} text - Texto da confirmação
 * @returns {Promise<boolean>} - Retorna true se confirmado
 */
export async function showConfirm(title, text) {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DC2626', // Danger color
    cancelButtonColor: '#64748B', // Secondary color
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    background: document.documentElement.classList.contains('dark') ? '#1E293B' : '#FFFFFF',
    color: document.documentElement.classList.contains('dark') ? '#F8FAFC' : '#0F172A',
  });

  return result.isConfirmed;
}
