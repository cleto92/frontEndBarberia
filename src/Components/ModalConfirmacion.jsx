/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';

const ModalConfirmacion = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} blur className="backdrop-blur-sm">
      <ModalContent className="bg-opacity-90 bg-white dark:bg-gray-800 shadow-xl rounded-lg">
        <ModalHeader className="text-lg font-semibold text-gray-900 dark:text-white">
          Confirmación de Reserva
        </ModalHeader>
        <ModalBody className="text-gray-600 dark:text-gray-300">
          <div className="flex flex-col space-y-4">
            <p>Gracias por realizar la reserva en Rey Barbería. Su código de cancelación fue enviado por email. Recuerde asistir al horario programado. Si desea cancelar la reserva, deberá ingresar a "Cancelar Reserva" y completar el formulario con los datos correspondientes.</p>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-end space-x-2">
          <Button auto flat color="error" onClick={onClose} className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white dark:border-red-400 dark:text-red-400 dark:hover:bg-red-400 dark:hover:text-gray-900">
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalConfirmacion;
