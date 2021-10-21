import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";
import { useDispatch } from "react-redux";
import { createCategory, updateCategory } from "../actions/categoryActions";
import { createBrand, updateBrand } from "../actions/brandActions";

export default function ModalForm({
  showModal,
  onClose,
  type,
  value,
  isBrand,
  id,
}) {
  const dispatch = useDispatch();
  const [category, setCategory] = React.useState("");
  const [brand, setBrand] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [isEdit, setIsEdit] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  useEffect(() => {
    if (isBrand) {
      setBrand(true);
      setCategory(value);
      setAction(type);
    } else {
      setBrand(false);
      setCategory(value);
      setAction(type);
    }
    if (action === "edit") {
      setIsEdit(true);
    }
  }, [dispatch, isBrand, value, type, action]);

  const isShowModal = (status) => {
    handleClose();
  };

  const handleClose = () => {
    onClose(false);
  };

  const handleCategoryUpdate = () => {
    dispatch(
      updateCategory({
        _id: id,
        name: category,
      })
    );
  };

  const handleBrandUpdate = () => {
    dispatch(
      updateBrand({
        _id: id,
        name: category,
      })
    );
  };

  const handleBrandCreate = () => {
    if (!category) {
      setErrorMessage("Product Brand should not be empty.");
    } else {
      setErrorMessage("");
      dispatch(
        createBrand({
          name: category,
        })
      );
    }
  };

  const handleCategoryCreate = () => {
    if (!category) {
      setErrorMessage("Product Category should not be empty.");
    } else {
      setErrorMessage("");
      dispatch(
        createCategory({
          name: category,
        })
      );
    }
  };

  return (
    <div>
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
        fullWidth={true}
      >
        {isEdit ? (
          <form onSubmit={brand ? handleBrandUpdate : handleCategoryUpdate}>
            <DialogTitle id="form-dialog-title">
              Update {brand ? "Brand" : "Category"}
            </DialogTitle>
            <DialogContent>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="category"
                label={brand ? "Product Brand" : "Product Category"}
                type="text"
                id="category"
                autoComplete="category"
                value={category ? category : ""}
                onChange={(e) => setCategory(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => isShowModal(true)} color="secondary">
                Cancel
              </Button>
              <Button
                onClick={brand ? handleBrandUpdate : handleCategoryUpdate}
                color="primary"
              >
                Update
              </Button>
            </DialogActions>
          </form>
        ) : (
          <form onSubmit={brand ? handleBrandCreate : handleCategoryCreate}>
            <DialogTitle id="form-dialog-title">
              Create {brand ? "Brand" : "Category"}
            </DialogTitle>
            <DialogContent>
              {errorMessage !== "" && (
                <Alert severity="error">{errorMessage}</Alert>
              )}

              <TextField
                error={errorMessage !== "" ? true : false}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="category"
                label={brand ? "Product Brand" : "Product Category"}
                type="text"
                id="category"
                autoComplete="category"
                value={category ? category : ""}
                onChange={(e) => setCategory(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => isShowModal(true)} color="secondary">
                Cancel
              </Button>
              <Button
                onClick={brand ? handleBrandCreate : handleCategoryCreate}
                color="primary"
              >
                Create
              </Button>
            </DialogActions>
          </form>
        )}
      </Dialog>
    </div>
  );
}
