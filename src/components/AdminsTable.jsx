import { Button, Divider, getKeyValue, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Popover, PopoverContent, PopoverTrigger, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaLock, FaRegUserCircle, FaUnlockAlt } from 'react-icons/fa';
import { FaKey, FaUser } from 'react-icons/fa6';
import { IoPersonAdd } from 'react-icons/io5';
import { MdDelete, MdEdit, MdEmail } from 'react-icons/md';
import useCreateUserMutation from '../hooks/useCreateUserMutation';
import useUpdatedUserMutation from '../hooks/useUpdateUserMutation';
import useDeleteUserMutation from '../hooks/useDeleteUserMutation';
import { handleCopy } from '../shared';

  const tableVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 25 },
  };

  const adminTableCols = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "password",
      label: "Password",
    },
    {
        key: "actions",
        label: "Actions",
    }
  ];

const AdminsTable = ({ admins }) => {
    const [page, setPage] = React.useState(1);
    const [ adminname, setAdminName ] = useState('');
    const [ adminmail, setAdminEmail ] = useState('');
    const [ adminpassword, setAdminPassword ] = useState('');
    const [ adminconfirmpassword, setAdminConfirmPassword ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);

    // variables to have initial values for admin
    const [ initialAdminName, setInitialAdminName ] = useState('');
    const [ initialAdminEmail, setInitialAdminEmail ] = useState('');
    const [ initialAdminPassword, setInitialAdminPassword ] = useState('');
    // const [ initialAdminConfirmPassword, setInitialAdminConfirmPassword ] = useState('');
    
    const [ adminToDelete, setAdminToDelete ] = React.useState(null);
    const [ adminKeyToEdit, setAdminKeyToEdit ] = React.useState(null);
    const [ editBtnClicked, setEditBtnClicked ] = React.useState(false);

    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);

    const createUserMutation = useCreateUserMutation();

    const deleteUserMutation = useDeleteUserMutation();

    const updateUserMutation = useUpdatedUserMutation();

    useEffect(() => {
        if (adminToDelete) {
          deleteUserMutation.mutate(adminToDelete);
          setAdminToDelete(null);
        }
    }, [adminToDelete])

    const rowsPerPage = 5;
    const pages = Math.ceil(admins?.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return admins?.slice(start, end);
    }, [page, admins]);

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const LockUnlockPassword = () => !showPassword ? (<FaUnlockAlt className="text-2xl text-default-400 flex-shrink-0 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />) : (<FaLock className="text-2xl text-default-400 flex-shrink-0 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />)

    const LockUnlockConfirmPassword = () => !showConfirmPassword ? (<FaUnlockAlt className="text-2xl text-default-400 flex-shrink-0 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />) : (<FaLock className="text-2xl text-default-400 flex-shrink-0 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />)

    const handleEditUser = (event, user) => {
        setAdminKeyToEdit(user?.userId);
        setAdminName(user.name);
        setAdminEmail(user.email);
        setAdminPassword(user.password);
        setAdminConfirmPassword(user.password);
        setEditBtnClicked(true);

        setInitialAdminName(user.name);
        setInitialAdminEmail(user.email);
        setInitialAdminPassword(user.password);
        // setInitialAdminConfirmPassword(user.password);
        onOpen();
    }

    const onCreateOrUpdateUser = () => {
        if(adminname && adminmail && adminpassword && adminconfirmpassword){
            if(adminpassword === adminconfirmpassword){

                if (editBtnClicked) {
                  // check if any of the fields are updated
                  if (adminname === initialAdminName && adminmail === initialAdminEmail && adminpassword === initialAdminPassword){
                    // no fields are updated, hence return from the method
                    return;
                  }

                  let updatedUser = {
                    userId: adminKeyToEdit
                  }

                  // if the admin name is updated, send it in request body
                  if (adminname !== initialAdminName) {
                    updatedUser = {
                      ...updatedUser,
                      name: adminname,
                    }
                  }

                  // if the admin mail is updated, send it in request body
                  if (adminmail !== initialAdminEmail) {
                    updatedUser = {
                     ...updatedUser,
                      email: adminmail,
                    }
                  }

                  // if the admin password is updated, send it in request body
                  if (adminpassword !== initialAdminPassword) {
                    updatedUser = {
                     ...updatedUser,
                      password: adminpassword,
                    }
                  }

                  // update the user
                  updateUserMutation?.mutate(updatedUser);
                } else {
                    const newAdmin = {
                        name: adminname,
                        email: adminmail,
                        password: adminpassword,
                        role: 'admin',
                    }

                    createUserMutation.mutate(newAdmin);
                }
                onClose();
                setEditBtnClicked(false);
                resetFormFields();
            } else {
              toast.error('Passwords do not match');
            }
        } else {
          toast.error('All fields are required');
        }
    }

    const onModalClose = () => {
      setEditBtnClicked(false);
      resetFormFields();
    }

    const resetFormFields = () => {
      setAdminName('');
      setAdminEmail('');
      setAdminPassword('');
      setAdminConfirmPassword('');
      setInitialAdminName('');
      setInitialAdminEmail('');
      setInitialAdminPassword('');
    }

  return (
    <>
      <Toaster position='top-right' />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }} className='self-end'>
        <Button onPress={onOpen} className='self-end bg-[#ff6b6b] text-white' startContent={<IoPersonAdd />}>Create Admin</Button>
      </motion.div>

      <motion.h1
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }} className='text-xl font-semibold px-4'>Admins</motion.h1>

        {/* Admins Table */}
        <motion.div
          initial={'hidden'}
          animate={'visible'}
          exit={'exit'}
          variants={tableVariants}
          transition={{ duration: 0.5 }}>
          
          <Table aria-label="Admins table" isStriped bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }>
              <TableHeader columns={adminTableCols}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
              </TableHeader>
              <TableBody emptyContent={'No admins'} items={items}>
              {(item) => (
                  <TableRow key={item.userId}>
                    {(columnKey) => {
                      if (columnKey === 'actions') {
                        return (
                            <TableCell>
                                <div className="relative flex items-center gap-2">
                                    <Tooltip content="Copy admin's email">
                                        <Button isIconOnly variant='light' color={'success'} onClick={() => handleCopy(item?.email)}>
                                            <span className="text-lg cursor-pointer active:opacity-50">
                                                <FaUser />
                                            </span>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip content="Copy admin's password">
                                        <Button isIconOnly variant='light' color={'warning'} onClick={() => handleCopy(item?.password)}>
                                            <span className="text-lg cursor-pointer active:opacity-50">
                                                <FaKey />
                                            </span>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip content="Edit user">
                                        <Button isIconOnly variant='light' color={'primary'} onClick={event => handleEditUser(event, item)}>
                                            <span className="text-lg cursor-pointer active:opacity-50">
                                                <MdEdit />
                                            </span>
                                        </Button>
                                    </Tooltip>
                                    <Popover placement="right" backdrop='opaque'>
                                        <PopoverTrigger>
                                            <Button isIconOnly variant='light' color='danger'>
                                                <span className="text-lg cursor-pointer active:opacity-50">
                                                    <MdDelete />
                                                </span>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <div className="px-1 py-2 flex flex-col gap-3">
                                                <div className="text-small font-bold">Are you sure want to delete the user?</div>
                                                <Button size='sm' className='text-center max-w-16' color='default' onClick={() => setAdminToDelete(item?.userId) }>Yes</Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </TableCell>
                        )
                      } else if (columnKey === 'adminpassword') {
                        return <TableCell>{ new Array(getKeyValue(item, columnKey)?.length).fill('*') }</TableCell>
                      } else {
                        return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                      }
                    }}
                  </TableRow>
              )}
              </TableBody>
          </Table>
        </motion.div>
        
        {/* Modal for creating / updating the admin */}
        <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="bottom-center"
        onClose={onModalClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[#ff6b6b]">{ editBtnClicked ? 'Update the admin' : 'Create new admin' }</ModalHeader>
              <Divider />
              <ModalBody className='my-2 sm:my-4 px-2 sm:px-4'>
                <Input
                    autoFocus
                    endContent={
                        <FaRegUserCircle className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Username"
                    placeholder="Enter the admin's name..."
                    variant="bordered"
                    value={adminname}
                    onValueChange={setAdminName}
                    required
                />
                <Input
                  endContent={
                    <MdEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter the admin's email..."
                  variant="bordered"
                  value={adminmail}
                  onValueChange={setAdminEmail}
                  required
                />
                <Input
                  endContent={
                    <LockUnlockPassword />
                  }
                  label="Password"
                  placeholder="Enter the admin's password..."
                  type={ showPassword ? 'text' : "password" }
                  variant="bordered"
                  value={adminpassword}
                  onValueChange={setAdminPassword}
                  required
                />
                <Input
                  endContent={
                    <LockUnlockConfirmPassword />
                  }
                  label="Confirm Password"
                  placeholder="Confirm the admin's password..."
                  type={ showConfirmPassword ? 'text' : "password" }
                  variant="bordered"
                  value={adminconfirmpassword}
                  onValueChange={setAdminConfirmPassword}
                  required
                />
                
              </ModalBody>
              <Divider />
              <ModalFooter>
                <Button className='bg-[#ff6b6b] text-white' onPress={onCreateOrUpdateUser}>
                  { editBtnClicked ? 'Update' : 'Create' }
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
        </Modal>
    </>
  )
}

export default AdminsTable