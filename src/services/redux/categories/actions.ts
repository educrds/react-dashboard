// Criar nova categoria
const addCategory = categories => ({
  type: 'ADD_CATEGORY',
  payload: categories,
});
// Obter todas categorias
const getCategory = categories => ({
  type: 'GET_CATEGORIES',
  payload: categories,
});
// Deletar categoria pelo ID
const deleteCategory = categoryID => ({
  type: 'DELETE_CATEGORY',
  payload: categoryID,
});
// Atualizar categoria pelo ID e dados atualizados
const updateCategory = (categoryID, updatedData) => ({
  type: 'UPDATE_CATEGORY',
  payload: {
    id: categoryID,
    data: updatedData,
  },
});

export { updateCategory, addCategory, deleteCategory, getCategory };
