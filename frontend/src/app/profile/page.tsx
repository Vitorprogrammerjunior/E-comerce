'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { UserIcon, ShoppingBagIcon, MapPinIcon, CogIcon } from '@heroicons/react/24/outline';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Brasil'
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchProfile();
  }, [user, router]);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      if (response.data.success) {
        const profileData = response.data.data; // Changed from response.data.user to response.data.data
        setProfile(profileData);
        setForm({
          name: profileData.name || '',
          email: profileData.email || '',
          phone: profileData.phone || '',
          street: profileData.address?.street || '',
          city: profileData.address?.city || '',
          state: profileData.address?.state || '',
          zipCode: profileData.address?.zipCode || '',
          country: profileData.address?.country || 'Brasil'
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await api.put('/users/profile', {
        name: form.name,
        phone: form.phone,
        address: {
          street: form.street,
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
          country: form.country
        }
      });

      if (response.data.success) {
        await fetchProfile();
        setIsEditing(false);
        alert('Perfil atualizado com sucesso!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Erro ao carregar perfil</h1>
          <Button onClick={() => router.push('/')}>Voltar ao Início</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-gray-900"
      >
        Minha Conta
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <UserIcon className="h-10 w-10 text-gray-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
              <p className="text-gray-600">{profile.email}</p>
            </div>

            <nav className="space-y-2">
              <motion.button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  activeTab === 'profile' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <UserIcon className="h-5 w-5" />
                <span>Perfil</span>
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  activeTab === 'orders' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingBagIcon className="h-5 w-5" />
                <span>Meus Pedidos</span>
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('address')}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  activeTab === 'address' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MapPinIcon className="h-5 w-5" />
                <span>Endereços</span>
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  activeTab === 'settings' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CogIcon className="h-5 w-5" />
                <span>Configurações</span>
              </motion.button>
            </nav>

            <div className="mt-6 pt-6 border-t">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full"
              >
                Sair
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Informações Pessoais</h2>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    Editar
                  </Button>
                ) : (
                  <div className="space-x-2">
                    <Button onClick={() => setIsEditing(false)} variant="outline">
                      Cancelar
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? 'Salvando...' : 'Salvar'}
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nome"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <Input
                  label="Email"
                  name="email"
                  value={form.email}
                  disabled={true}
                  className="bg-gray-50"
                />
                <Input
                  label="Telefone"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Membro desde
                  </label>
                  <input
                    type="text"
                    value={new Date(profile.createdAt).toLocaleDateString('pt-BR')}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Meus Pedidos</h2>
              <div className="text-center py-8">
                <ShoppingBagIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Você ainda não fez nenhum pedido.</p>
                <Button
                  onClick={() => router.push('/products')}
                  className="mt-4"
                >
                  Começar a Comprar
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'address' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Endereços</h2>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    Editar
                  </Button>
                ) : (
                  <div className="space-x-2">
                    <Button onClick={() => setIsEditing(false)} variant="outline">
                      Cancelar
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? 'Salvando...' : 'Salvar'}
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input
                    label="Endereço"
                    name="street"
                    value={form.street}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <Input
                  label="Cidade"
                  name="city"
                  value={form.city}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <Input
                  label="Estado"
                  name="state"
                  value={form.state}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <Input
                  label="CEP"
                  name="zipCode"
                  value={form.zipCode}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <Input
                  label="País"
                  name="country"
                  value={form.country}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Configurações</h2>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium mb-2">Notificações</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Receber emails sobre promoções
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Receber atualizações de pedidos
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Receber newsletter
                    </label>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium mb-2">Privacidade</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Permitir cookies de análise
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Compartilhar dados para personalização
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2 text-red-600">Zona de Perigo</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Estas ações são irreversíveis. Por favor, tenha certeza.
                  </p>
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                    Excluir Conta
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
