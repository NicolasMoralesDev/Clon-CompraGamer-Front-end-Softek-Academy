import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import BuildYourPcLeft from './BuildYourPcComp/BuildYourPcLeft';
import BuildYourPcRight from './BuildYourPcComp/BuildYourPcRight';
import BuildYourPcTotal from './BuildYourPcComp/BuildYourPcTotal';

import cooler2 from '../../assets/pcComponents/cooler2.png';
import cpu2 from '../../assets/pcComponents/cpu2.png';
import gabo2 from '../../assets/pcComponents/gabo2.png';
import gpu2 from '../../assets/pcComponents/gpu2.png';
import memo2 from '../../assets/pcComponents/memo2.png';
import hhd2 from '../../assets/pcComponents/hhd2.png';
import mother2 from '../../assets/pcComponents/mother2.png';
import moni4 from '../../assets/pcComponents/moni4.png';
import periferico2 from '../../assets/pcComponents/periferico2.png';
import poder2 from '../../assets/pcComponents/poder2.png';

import { getAllProducts, getProductByCategory } from '../../utils/fetchProductsList';
import { PaginationContext } from '../../context/PaginationContext';
export default function BuildYourPc() {

  const cimages = [
    { category: 'Cooler', url: cooler2, name: 'Coolers y refrigeración' },
    { category: 'Cpu', url: cpu2, name: 'Procesadores' },
    { category: 'Discos', url: hhd2, name: 'Unidades de almacenamiento' },
    { category: 'Monitor', url: moni4, name: 'Monitores' },
    { category: 'Gabinete', url: gabo2, name: 'Gabinetes' },
    { category: 'Gpu', url: gpu2, name: 'Placas de video' },
    { category: 'Memoria', url: memo2, name: 'Memorias RAM' },
    { category: 'Mother', url: mother2, name: 'Motherboards' },
    { category: 'Periferico', url: periferico2, name: 'Periféricos' },
    { category: 'Psu', url: poder2, name: 'Fuentes' },
  ];

  const { page, setTotal } = useContext(PaginationContext);

  const [products, setProducts] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null); // [1
  const [selectedProducts, setSelectedProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    let data = await getAllProducts();
    setProducts(data.productos);
    setLoading(false);
  }

  const getProductsCat = async (category) => {
    setLoading(true);
    const data = await getProductByCategory(category, page);
    setTotal(data.total);
    setProducts(data.productos);
    setLoading(false);
  };

  useEffect(() => {

    getProducts();

  }, []);

  useEffect(() => {
    const name = cimages.find((cimage) => cimage.category === selectedCategory)?.name;
    setSelectedCategoryName(name); // [1

  }, [selectedCategory]);
  // Llamada a la api para obtener los productos por categoria
  const handleImageClick = (category) => {
    getProductsCat(category);
    setSelectedCategory(category);
  };

  // selectedProducts -> es el carrito interno
  const handleProductClick = (product) => {
    setSelectedProducts((prevSelectedProducts) => [
      ...prevSelectedProducts,
      product,
    ]);
  };

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Build your pc</title>
        <link rel='canonical' href='http://mysite.com/example' />
      </Helmet>

      <div className='container mb-3 mt-3'>
        <div className='row mx-auto'>
          <div className='col-12 col-md-4 '>
            <BuildYourPcLeft
              cimages={cimages}
              selectedCategory={selectedCategory}
              handleImageClick={handleImageClick}
              selectedCategoryName={selectedCategoryName}
            />

            <BuildYourPcTotal selectedProducts={selectedProducts} />
          </div>
          <div className='col-12 col-md-8'>
            {!loading && <BuildYourPcRight
              componentspc={products}
              selectedCategory={selectedCategory}
              handleProductClick={handleProductClick}
              selectedCategoryName={selectedCategoryName}
            />}
          </div>
        </div>
      </div>
    </>
  );
}