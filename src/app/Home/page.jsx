'use client';
import Navbar from '@/components/Navbar/Navbar';
import isAuth from '@/components/isAuth/isAuth';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPost,
  deletePost,
  editPost,
  setError,
  setLoading,
  setPosts,
} from '../redux/slices/postsSlice';

import Loading from '@/components/Loading/Loading';
import { redirect, useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { isAuthenticated } from '../../Utils/Auth';

const Home = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [editingPostId, setEditingPostId] = useState(null);
  const [user, setUser] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();

  const { data: posts, loading, error } = useSelector((state) => state.posts);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    if (editingPostId !== null) {
      dispatch(editPost({ id: editingPostId, ...formData }));
    } else {
      const newPost = { id: Date.now(), ...formData };
      dispatch(addPost(newPost));
    }

    setIsModalOpen(false);
    setFormData({ title: '', body: '' });
    setEditingPostId(null);
  };

  const handleEdit = (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);
    setFormData({ title: postToEdit.title, body: postToEdit.body });
    setEditingPostId(postId);
    showModal();
  };
  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(setLoading(true)); // Set loading to true before fetching data
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts'
        );
        const data = await response.json();
        dispatch(setPosts(data));
      } catch (error) {
        console.error('Error fetching posts:', error);
        dispatch(setError('Error fetching posts'));
      } finally {
        dispatch(setLoading(false)); // Set loading to false after fetching (whether successful or not)
      }
    };
    fetchPosts();
  }, [dispatch]);

  useLayoutEffect(() => {
    const isAuth = isAuthenticated;
    if (!isAuth) {
      redirect('/');
    }
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-around mt-6">
        <div className="text-4xl">Posts</div>
        <button
          onClick={() => {
            setFormData({ title: '', body: '' });
            setEditingPostId(null);
            showModal();
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Add New +
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto mt-10">
          <div className="flex flex-wrap gap-5">
            {posts.map((post) => (
              <div
                className="border-2 p-6 rounded-lg w-60 flex flex-col"
                key={post.id}
              >
                <div className="text-2xl font-semibold">{post.title}</div>
                <div>{post.body}</div>

                <div className="flex-grow"></div>

                <div className="flex justify-around gap-3 mt-3">
                  {/* Edit button */}
                  <Button
                    type="secondary"
                    onClick={() => handleEdit(post.id)}
                    className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded-full"
                  >
                    Edit
                  </Button>
                  {/* Delete button */}
                  <Button
                    type="red"
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-full"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        title={editingPostId !== null ? 'Edit Post' : 'Add New Post'}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Save"
      >
        <form className="mx-auto max-w-lg rounded-lg border">
          <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
              <label
                htmlFor="title"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Title
              </label>
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleFormChange}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>
            <div>
              <label
                htmlFor="body"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Body
              </label>
              <textarea
                name="body"
                value={formData.body}
                onChange={handleFormChange}
                className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              ></textarea>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default isAuth(Home);
