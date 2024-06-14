import styles from '../../styles/moduleManagement/deleteModules.module.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModalModule } from "./ModalModule";

export function DeleteModules() {
    const [modules, setModules] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await fetch('http://localhost:3000/modules');
                if (!response.ok) {
                    throw new Error('Erro ao buscar módulos');
                }
                const data = await response.json();
                console.log('Módulos:', data);
                setModules(data);
            } catch (error) {
                setError('Erro ao buscar módulos');
                console.error('Erro ao buscar módulos:', error);
            }
        };

        fetchModules();
    }, []);

    const openModal = (module) => {
        setSelectedModule(module);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedModule(null);
        setIsModalOpen(false);
    };

    const handleDeleteModule = async () => {
        try {
            const response = await fetch(`http://localhost:3000/modules/${selectedModule.id_modulo}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setModules(modules.filter(module => module.id_modulo !== selectedModule.id_modulo));
                closeModal();
                navigate('/moduleManagement', { state: { message: 'Módulo excluído!' } });
            } else {
                console.error('Erro ao excluir módulo');
            }
        } catch (error) {
            console.error('Erro ao excluir módulo:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Visualizar Módulos</h1>
            <ul className={styles.listaModulos}>
                {modules.map(module => (
                    <li key={module.id_modulo} className={styles.itemModulo}>
                        <span className={styles.moduleName}>{module.nome_modulo} - {module.descricao}</span>
                        <button 
                            className={styles.deleteButton} 
                            onClick={() => openModal(module)}
                        >
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
            <ModalModule
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleDeleteModule}
                module={selectedModule}
            />
        </div>
    )
}