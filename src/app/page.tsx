import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to E-Digital ERP
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Streamline your business operations with our comprehensive ERP solution
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Inventory Management</h3>
                <p className="text-gray-600">Track stock levels, manage suppliers, and optimize inventory costs.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sales & CRM</h3>
                <p className="text-gray-600">Manage customer relationships and streamline sales processes.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Management</h3>
                <p className="text-gray-600">Handle accounting, budgeting, and financial reporting.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
