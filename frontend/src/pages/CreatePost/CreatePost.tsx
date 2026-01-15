import React, { useState, useEffect } from 'react';
import './CreatePost.css';
import { TopBar } from '../../components/TopBar/TopBar';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Tab } from '../../components/Tab/Tab';
import { TopicSelectDropdown, type TopicOption } from '../../components/TopicSelectDropdown/TopicSelectDropdown';
import { TextField } from '../../components/TextField/TextField';
import { LabelSelector } from '../../components/LabelSelector/LabelSelector';
import { UploadFile, type UploadedFile } from '../../components/UploadFile/UploadFile';
import { Button } from '../../components/Button/Button';
import avatar1 from '../../assets/avatar1.png';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';



const CreatePost: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Texto' | 'Archivos'>('Texto');
  const [topics, setTopics] = useState<TopicOption[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<TopicOption | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();


  const handleSuccess = () => {
    showSuccess('¡Publicación creada con éxito!');
  };

  const handleError = () => {
    showError('Hubo un error al procesar la solicitud');
  };

  useEffect(() => {
    // Fetch topics
    fetch('http://localhost:3001/topics')
      .then((res) => res.json())
      .then((data) => {
        const topicsData: TopicOption[] = data.map((topic: any) => ({
          id: topic.id,
          name: topic.title || topic.name,
          image: topic.image || '',
        }));
        setTopics(topicsData);
      })
      .catch((err) => console.error('Error fetching topics:', err));
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  const handleSaveDraft = () => {
    // TODO: Implement save draft functionality
    console.log('Saving draft...', { selectedTopic, title, content, selectedLabels });
  };

  const handlePublish = async () => {
    if (!selectedTopic) {
      alert('Por favor seleccioná un tema antes de publicar.');
      return;
    }
  
    try {
      const formData = new FormData();
      const thisuser = localStorage.getItem('user') || 'anonymous';
      formData.append('user', thisuser);
      formData.append('topic', selectedTopic.name.toString());
      formData.append('title', title);
      formData.append('content', content);
      formData.append('tags', JSON.stringify(selectedLabels));
  
      // Agregar archivos si existen
      uploadedFiles.forEach((fileObj) => {
        formData.append('files', fileObj.file); // multer espera "files"
      });
  
      const response = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        body: formData, // NO usamos headers Content-Type
      });
  
      if (!response.ok) {
        throw new Error('Error creando post');
      }
  
      const data = await response.json();
      console.log('Post creado:', data);
      navigate(-1); // vuelve a donde estabas recién
      handleSuccess();
  
      // Opcional: limpiar campos
      setTitle('');
      setContent('');
      setSelectedLabels([]);
      setUploadedFiles([]);
      setActiveTab('Texto');
    } catch (err) {
      console.error(err);
      handleError();
    }
  };
  
  const availableLabels = [
    'Algebra',
    'Duda',
    'Ingenieria',
    'Matrices',
    'Sistemas de ecuaciones',
    'Vectores',
    'Calculo',
    'Programacion',
  ];

  return (
    <div className="create-post">
      <TopBar username="@Khali_1998" avatar={avatar1} />
      <Sidebar activeItem="Home" />

      <div className="create-post__content">
        <div className="create-post__header-wrapper">
          <Header title="Crear Publicación" onBack={handleBack} />
        </div>

        <div className="create-post__form">
          <div className="create-post__topic-select">
            <TopicSelectDropdown
              topics={topics}
              selectedTopic={selectedTopic}
              onSelect={setSelectedTopic}
              placeholder="Seleccionar tema"
            />
          </div>

          <div className="create-post__tabs">
            <Tab
              label="Texto"
              active={activeTab === 'Texto'}
              onClick={() => setActiveTab('Texto')}
            />
            <Tab
              label="Archivos"
              active={activeTab === 'Archivos'}
              onClick={() => setActiveTab('Archivos')}
            />
          </div>

          {activeTab === 'Texto' && (
            <>
              <div className="create-post__title-field">
                <TextField
                  placeholder="Escribe el título de tu publicación..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={300}
                  showCharCount
                  multiline={false}
                />
              </div>

              <div className="create-post__content-field">
                <TextField
                  placeholder="Escribe el contenido de tu publicación..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  multiline
                  rows={10}
                />
              </div>

              <div className="create-post__labels-field">
                <LabelSelector
                  selectedLabels={selectedLabels}
                  availableLabels={availableLabels}
                  maxLabels={10}
                  placeholder="Agregar Etiquetas"
                  onChange={setSelectedLabels}
                />
              </div>
            </>
          )}

          {activeTab === 'Archivos' && (
            <div className="create-post__files-field">
              <UploadFile
                files={uploadedFiles}
                onFilesChange={setUploadedFiles}
                maxFiles={10}
                maxFileSize={10}
                acceptedFileTypes={['image/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
              />
            </div>
          )}

          <div className="create-post__actions">
            <Button variant="secondary" onClick={handleSaveDraft}>
              Guardar borrador
            </Button>
            <Button variant="primary" onClick={handlePublish}>
              Publicar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

