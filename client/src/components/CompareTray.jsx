// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Scale, X, GitCompare } from 'lucide-react';
import {
  removeFromCompare,
  clearCompare,
  clearCompareNotice,
} from '@/store/product/compareSlice';

// A sticky bottom tray that surfaces the current compare selection from any
// page. Hidden entirely when nothing is selected.
const CompareTray = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, max, notice } = useSelector((state) => state.compare);

  useEffect(() => {
    if (notice) {
      toast.info(notice);
      dispatch(clearCompareNotice());
    }
  }, [notice, dispatch]);

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="fixed bottom-0 inset-x-0 z-40 px-3 pb-3 pointer-events-none"
        >
          <div className="pointer-events-auto max-w-5xl mx-auto bg-white/95 backdrop-blur border border-gray-200 shadow-2xl rounded-2xl p-3 sm:p-4">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-gray-700 font-semibold shrink-0">
                <Scale className="w-5 h-5 text-blue-600" />
                Compare
                <span className="text-xs font-normal text-gray-400">
                  ({items.length}/{max})
                </span>
              </div>

              {/* Selected product thumbnails */}
              <div className="flex items-center gap-2 flex-1 overflow-x-auto">
                {items.map((p) => (
                  <div
                    key={p._id}
                    className="relative shrink-0 w-14 h-14 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden group"
                    title={p.name}
                  >
                    <img
                      src={p.image || 'https://via.placeholder.com/80'}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => dispatch(removeFromCompare(p._id))}
                      className="absolute top-0 right-0 bg-black/50 hover:bg-red-600 text-white rounded-bl-lg p-0.5 transition"
                      title="Remove"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => dispatch(clearCompare())}
                  className="text-sm text-gray-500 hover:text-red-600 px-2 py-2 transition hidden sm:block"
                >
                  Clear
                </button>
                <button
                  onClick={() => navigate('/compare')}
                  disabled={items.length < 2}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition"
                >
                  <GitCompare className="w-4 h-4" />
                  {items.length < 2 ? 'Add 1 more' : 'Compare'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompareTray;
