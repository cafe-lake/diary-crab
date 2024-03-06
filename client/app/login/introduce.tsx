import React from 'react';

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const Introcuce: React.FC<ModalProps> = ({ showModal, closeModal }) => {
  return (
    <>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-200 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      絵日記クラブとは？
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm leading-5 text-gray-500">
                        絵日記クラブが目指すもの<br />
                        ここは平和な絵日記クラブ。みんな絵日記を書いてシェアするクラブ。君はここではカニになる。描きたいままに書いて、他人を気にせず自己満足な記録を残せばOK！インスタグラムほど多くの機能はないし、しっかりしてないと思います。けど、ゆっくりまったりやったっていいじゃない。のんびりすこやかに🦀
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    onClick={() => closeModal()}
                  >
                    閉じる
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Introcuce;
