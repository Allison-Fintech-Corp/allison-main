import { useState } from "react";
import { useParams } from "react-router-dom";
import Workspace from "@/models/workspace";
import paths from "@/utils/paths";
import { useTranslation } from "react-i18next";
import showToast from "@/utils/toast";

export default function DeleteWorkspace({ workspace }) {
  const { slug } = useParams();
  const [deleting, setDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const confirmDelete = async () => {
    setDeleting(true);
    setShowModal(false);
    
    const success = await Workspace.delete(workspace.slug);
    if (!success) {
      showToast("Workspace could not be deleted!", "error", { clear: true });
      setDeleting(false);
      return;
    }

    workspace.slug === slug
      ? (window.location = paths.home())
      : window.location.reload();
  };

  const cancelDelete = () => {
    setShowModal(false);
  };
  return (
    <div className="flex flex-col mt-10">
      <label className="block input-label">{t("general.delete.title")}</label>
      <p className="text-theme-text-secondary text-xs font-medium py-1.5">
        {t("general.delete.description")}
      </p>
      <button
        disabled={deleting}
        onClick={handleDeleteClick}
        type="button"
        className="w-60 mt-4 transition-all duration-300 border border-transparent rounded-lg whitespace-nowrap text-sm px-5 py-2.5 focus:z-10 bg-red-500/25 text-red-200 light:text-red-500 hover:light:text-[#FFFFFF] hover:text-[#FFFFFF] hover:bg-red-600 disabled:bg-red-600 disabled:text-red-200 disabled:animate-pulse"
      >
        {deleting ? t("general.delete.deleting") : t("general.delete.delete")}
      </button>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-theme-bg-secondary rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-theme-text-primary mb-4">
              {t("general.delete.title")}
            </h3>
            <p className="text-theme-text-secondary mb-6">
              {t("general.delete.confirm-start")} <strong>{workspace.name}</strong> {t("general.delete.confirm-end")}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-theme-text-secondary border border-theme-modal-border rounded-lg hover:bg-theme-bg-primary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-red-600 disabled:animate-pulse transition-colors"
              >
                {deleting ? t("general.delete.deleting") : t("general.delete.delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
