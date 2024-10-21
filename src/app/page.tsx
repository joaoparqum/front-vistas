'use client';
import React from 'react';
import { Breadcrumb, Button, Layout, Menu, Space, theme } from 'antd';
import TabelaArquivos from './components/TabelaArquivos';
import Image from 'next/image';
import Search from 'antd/es/transfer/search';
import { SearchProps } from 'antd/es/input';

const { Header, Content, Footer } = Layout;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header className="flex items-center justify-between">
        <div className="relative h-32 w-32 mr-4">
          <Image
            src="/assets/casa-logo.jpg" 
            alt="Logo"
            layout="fill" 
            objectFit="contain" 
          />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ flex: 1, minWidth: 0 }}
        />
        <h1 className="text-white font-bold text-2xl">Vistas Explodidas</h1>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Documentos</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <h1 style={{ textAlign: 'center' }} className='font-bold text-2xl mb-5'>
            Tabela de Vistas Explodidas
          </h1>
          <Button type="primary" className='mb-3'>Adicionar documento</Button>
          
          <Search placeholder="Pesquisar documento" onSearch={onSearch} enterButton />
          <br /><br />

          <TabelaArquivos/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <h1 className='font-bold text-2xl'>Casa do Construtor | Irecê ©{new Date().getFullYear()}</h1>
      </Footer>
    </Layout>
  );
};

export default App;
